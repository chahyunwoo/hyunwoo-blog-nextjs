import { MetadataRoute } from "next";
import { getCategoriesWithTags, getPublishedPosts } from "@/services/post";

const BASE_URL = "https://chahyunwoo.dev";
const ABOUT_LAST_MODIFIED = "2025-03-27T00:00:00.000Z";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const categories = await getCategoriesWithTags();

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.meta.slug}`,
    lastModified: new Date(post.meta.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about/ko`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about/en`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about/jp`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map(
    ({ category }) => ({
      url: `${BASE_URL}/?category=${category}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticPages, ...categoryPages, ...blogPosts];
}
