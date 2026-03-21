import { cache } from 'react'
import { apiFetch } from '@/shared/api/api.client'
import { ENDPOINTS } from '@/shared/api/endpoints'
import type { CategoryData, Post, PostMeta } from '@/shared/types'

interface ApiPost {
  id: number
  slug: string
  title: string
  description: string
  content?: string
  category: string
  thumbnailUrl: string | null
  published: boolean
  createdAt: string
  updatedAt: string
  tags: { id: number; name: string }[]
}

interface ApiPostsResponse {
  posts: ApiPost[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface ApiCategory {
  category: string
  count: number
  recent: boolean
  tags: { name: string; slug: string; count: number }[]
}

interface ApiTagsResponse {
  tags: { name: string; slug: string; count: number }[]
  total: number
}

interface ApiRelatedResponse {
  related: ApiPost[]
  recommended: ApiPost[]
}

function toPost(api: ApiPost): Post {
  const meta: PostMeta = {
    title: api.title,
    description: api.description,
    date: api.createdAt,
    mainTag: api.category,
    tags: api.tags.map(t => t.name),
    thumbnail: api.thumbnailUrl || '',
    published: api.published,
    slug: api.slug,
  }

  return { meta, content: api.content || '' }
}

export interface PaginatedPosts {
  posts: Post[]
  total: number
  page: number
  totalPages: number
}

export const getPaginatedPosts = async (params?: {
  page?: number
  limit?: number
  category?: string
  tag?: string
}): Promise<PaginatedPosts> => {
  const searchParams = new URLSearchParams()
  searchParams.set('page', String(params?.page || 1))
  searchParams.set('limit', String(params?.limit || 9))
  if (params?.category) searchParams.set('category', params.category)
  if (params?.tag) searchParams.set('tag', params.tag)

  const data = await apiFetch<ApiPostsResponse>(`${ENDPOINTS.blog.posts}?${searchParams}`)

  if (!data) return { posts: [], total: 0, page: 1, totalPages: 0 }

  return {
    posts: data.posts.map(toPost),
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
  }
}

export const getPublishedPosts = async (): Promise<Post[]> => {
  const result = await getPaginatedPosts({ limit: 50 })
  return result.posts
}

export const getRecentPosts = async (limit = 5): Promise<Post[]> => {
  const data = await apiFetch<ApiPost[]>(`${ENDPOINTS.blog.recentPosts}?limit=${limit}`)
  if (!data) return []
  return data.map(toPost)
}

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const data = await apiFetch<ApiPost>(ENDPOINTS.blog.postBySlug(slug))
  if (!data) return null
  return toPost(data)
}

export const getRelatedPosts = async (slug: string): Promise<{ related: Post[]; recommended: Post[] }> => {
  const data = await apiFetch<ApiRelatedResponse>(ENDPOINTS.blog.relatedPosts(slug))

  if (!data) return { related: [], recommended: [] }

  return {
    related: data.related.map(toPost),
    recommended: data.recommended.map(toPost),
  }
}

export const getCategoriesWithTags = cache(async (): Promise<CategoryData[]> => {
  const data = await apiFetch<ApiCategory[]>(ENDPOINTS.blog.categories)

  if (!data) return []

  return data.map(cat => ({
    category: cat.category,
    subCategory: cat.tags.map(t => ({ name: t.name, count: t.count })),
    postCount: cat.count,
    recent: cat.recent,
  }))
})

export const getTagCloud = async (limit = 15): Promise<{ tags: { name: string; count: number }[]; total: number }> => {
  const data = await apiFetch<ApiTagsResponse>(`${ENDPOINTS.blog.tags}?limit=${limit}`)

  if (!data) return { tags: [], total: 0 }

  return {
    tags: data.tags.map(t => ({ name: t.name, count: t.count })),
    total: data.total,
  }
}
