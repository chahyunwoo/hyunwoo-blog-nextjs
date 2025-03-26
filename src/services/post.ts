import { glob } from "fast-glob";
import { POSTS_PATH, RECENT_DAYS } from "@/lib/constants";
import type { Post, PostMeta } from "@/types";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { cache } from "react";
import { delay } from "@/lib/utils";

export const getPostFilePaths = async (): Promise<string[]> => {
  return glob("**/*.mdx", { cwd: POSTS_PATH });
};

export const getPostFilePathBySlug = async (
  slug: string
): Promise<string | null> => {
  const files = await getPostFilePaths();
  const filePath = files.find((file) => file.endsWith(`${slug}.mdx`));
  return filePath ?? null;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const filePath = await getPostFilePathBySlug(slug);

  if (!filePath) {
    return null;
  }

  const fullPath = path.join(POSTS_PATH, filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const grayMatter = data as PostMeta;

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
    ...grayMatter,
    meta,
    content,
  };
};

export const getAllPosts = async (): Promise<Post[]> => {
  const filePaths = await getPostFilePaths();
  const posts = await Promise.all(
    filePaths.map(async (filePath) => {
      const slug = filePath.replace(/\.mdx$/, "");
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
};

export const getPublishedPosts = async (): Promise<Post[]> => {
  const posts = (await getAllPosts()).filter((post) => post.meta.published);

  return posts;
};

export const getCategoriesWithTags = cache(
  async (): Promise<
    {
      category: string;
      subCategory: {
        name: string;
        count: number;
      }[];
      postCount: number;
      recent: boolean;
    }[]
  > => {
    const posts = await getPublishedPosts();
    const now = new Date();
    const categoryMap = new Map<string, Map<string, number>>();
    const categoryPostCount = new Map<string, number>();
    const recentPosts = new Set<string>();

    posts.forEach((post) => {
      const category = post.meta.mainTag;
      const tags = post.meta.tags;
      const postDate = new Date(post.meta.date);

      categoryPostCount.set(
        category,
        (categoryPostCount.get(category) || 0) + 1
      );

      const daysDiff = Math.floor(
        (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff <= RECENT_DAYS) {
        recentPosts.add(category);
      }

      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Map());
      }

      const tagCountMap = categoryMap.get(category)!;
      tags.forEach((tag) => {
        const currentCount = tagCountMap.get(tag) || 0;
        tagCountMap.set(tag, currentCount + 1);
      });
    });

    const result = Array.from(categoryMap.entries()).map(
      ([category, tagCountMap]) => {
        return {
          category,
          subCategory: Array.from(tagCountMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count),
          postCount: categoryPostCount.get(category) || 0,
          recent: recentPosts.has(category),
        };
      }
    );

    return result.sort((a, b) => b.postCount - a.postCount);
  }
);
