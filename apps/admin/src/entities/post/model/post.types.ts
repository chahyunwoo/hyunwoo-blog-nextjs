export interface Post {
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

export interface PostListResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PostListParams {
  page?: number
  limit?: number
  category?: string
}

export interface CreatePostBody {
  title: string
  slug?: string
  description?: string
  content: string
  category?: string
  tags?: string[]
  thumbnailUrl?: string
  published: boolean
}

export interface UpdatePostBody extends Partial<CreatePostBody> {}
