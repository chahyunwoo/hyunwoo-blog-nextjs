export interface ApiPost {
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

export interface ApiPostsResponse {
  posts: ApiPost[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiCategory {
  category: string
  icon?: string
  count: number
  recent: boolean
  tags: { name: string; slug: string; count: number }[]
}

export interface ApiTagsResponse {
  tags: { name: string; slug: string; count: number }[]
  total: number
}

export interface ApiRelatedResponse {
  related: ApiPost[]
  recommended: ApiPost[]
}
