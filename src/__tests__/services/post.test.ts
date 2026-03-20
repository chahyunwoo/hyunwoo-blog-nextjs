import { describe, it, expect } from "vitest";
import { getPostBySlug, getPublishedPosts } from "@/services/post";

describe("getPostBySlug", () => {
  it("should return null for non-existent slug", () => {
    const result = getPostBySlug("non-existent-post-slug-12345");
    expect(result).toBeNull();
  });

  it("should return post with valid meta for existing slug", () => {
    const result = getPostBySlug("create-blog-by-nextjs");
    expect(result).not.toBeNull();
    expect(result?.meta.title).toBeTruthy();
    expect(result?.meta.slug).toBe("create-blog-by-nextjs");
    expect(result?.content).toBeTruthy();
  });
});

describe("getPublishedPosts", () => {
  it("should return array of published posts", async () => {
    const posts = await getPublishedPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("should return posts sorted by date descending", async () => {
    const posts = await getPublishedPosts();
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].meta.date).getTime();
      const curr = new Date(posts[i].meta.date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("should only return published posts", async () => {
    const posts = await getPublishedPosts();
    posts.forEach((post) => {
      expect(post.meta.published).toBe(true);
    });
  });
});
