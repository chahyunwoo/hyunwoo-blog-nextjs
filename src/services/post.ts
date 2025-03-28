import { glob } from "fast-glob";
import { POSTS_PATH, RECENT_DAYS } from "@/lib/constants";
import type { CategoryData, Post, PostMeta } from "@/types";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { cache } from "react";
import { delay } from "@/lib/utils";

export const getPostBySlug = (slug: string): Post | null => {
  const files = glob.sync(`**/${slug}.mdx`, { cwd: POSTS_PATH });

  if (files.length === 0) {
    return null;
  }

  const filePath = files[0];
  const fullPath = path.join(POSTS_PATH, filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const meta: PostMeta = {
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    mainTag: data.mainTag || "",
    tags: data.tags || [],
    thumbnail: data.thumbnail || "",
    published: data.published !== false,
    slug: slug,
  };

  return {
    ...(data as PostMeta),
    meta,
    content,
  };
};

export const getPublishedPosts = async (): Promise<Post[]> => {
  const filePaths = await glob("**/*.mdx", { cwd: POSTS_PATH });

  const posts = filePaths
    .map((filePath) => {
      const slug = filePath.replace(/\.mdx$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => post !== null && post.meta.published);

  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
};

export const getCategoriesWithTags = cache(
  async (): Promise<CategoryData[]> => {
    const posts = await getPublishedPosts();
    const now = new Date();
    const recentDateThreshold = new Date(now);
    recentDateThreshold.setDate(now.getDate() - RECENT_DAYS);

    const categoryMap = new Map<string, Map<string, number>>();
    const categoryData = new Map<
      string,
      { count: number; isRecent: boolean }
    >();

    posts.forEach((post) => {
      const category = post.meta.mainTag;
      const tags = post.meta.tags;
      const postDate = new Date(post.meta.date);
      const isRecent = postDate >= recentDateThreshold;

      const currentData = categoryData.get(category) || {
        count: 0,
        isRecent: false,
      };
      categoryData.set(category, {
        count: currentData.count + 1,
        isRecent: currentData.isRecent || isRecent,
      });

      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Map());
      }

      const tagCountMap = categoryMap.get(category)!;
      tags.forEach((tag) => {
        tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
      });
    });

    return Array.from(categoryMap.entries()).map(([category, tagCountMap]) => {
      const data = categoryData.get(category)!;
      return {
        category,
        subCategory: Array.from(tagCountMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        postCount: data.count,
        recent: data.isRecent,
      };
    });
  }
);
