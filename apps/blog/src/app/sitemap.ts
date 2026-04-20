import { BASE_URL } from '@hyunwoo/shared/config'
import type { MetadataRoute } from 'next'
import { getCategoriesWithTags, getPublishedPosts } from '@/entities/post'

const ABOUT_LAST_MODIFIED = '2025-03-27T00:00:00.000Z'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCategoriesWithTags()])

  const blogPosts: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.meta.slug}`,
    lastModified: new Date(post.meta.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE_URL}/?category=${encodeURIComponent(cat.category)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const tagPages: MetadataRoute.Sitemap = categories.flatMap(cat =>
    cat.subCategory.map(sub => ({
      url: `${BASE_URL}/?category=${encodeURIComponent(cat.category)}&tag=${encodeURIComponent(sub.name)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    })),
  )

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about/ko`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about/en`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about/jp`,
      lastModified: ABOUT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  return [...staticPages, ...categoryPages, ...tagPages, ...blogPosts]
}
