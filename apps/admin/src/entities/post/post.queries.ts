import { ENDPOINTS } from '@hyunwoo/shared/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi, uploadFile } from '@/shared/api'
import { queryKeys } from '@/shared/config'

interface PostListParams {
  page?: number
  limit?: number
  category?: string
}

interface PostListResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface Post {
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

interface CreatePostBody {
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string[]
  thumbnailUrl?: string
  published: boolean
}

interface UpdatePostBody extends Partial<CreatePostBody> {}

export function usePostList(params?: PostListParams) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.category) searchParams.set('category', params.category)

  return useQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => adminApi.get(`${ENDPOINTS.blog.posts}?${searchParams}`).json<PostListResponse>(),
  })
}

export function usePostDetail(slug: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(slug),
    queryFn: () => adminApi.get(ENDPOINTS.blog.postBySlug(slug).slice(1)).json<Post>(),
    enabled: !!slug,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreatePostBody) => adminApi.post(ENDPOINTS.blog.posts.slice(1), { json: body }).json<Post>(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}

export function useUpdatePost(slug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdatePostBody) =>
      adminApi.put(ENDPOINTS.blog.postBySlug(slug).slice(1), { json: body }).json<Post>(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(slug) })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => adminApi.delete(ENDPOINTS.blog.postBySlug(slug).slice(1)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}

export function useUploadThumbnail(slug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('thumbnail', file)
      return uploadFile<{ thumbnailUrl: string }>(`api/blog/posts/${slug}/thumbnail`, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(slug) })
    },
  })
}

export type { CreatePostBody, Post, PostListParams, PostListResponse, UpdatePostBody }
