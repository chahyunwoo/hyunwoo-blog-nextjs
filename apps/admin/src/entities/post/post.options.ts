import { ENDPOINTS } from '@hyunwoo/shared/api'
import { queryOptions } from '@tanstack/react-query'
import { adminApi } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import type { Post, PostListParams, PostListResponse } from './model'

function stripLeadingSlash(path: string) {
  return path.startsWith('/') ? path.slice(1) : path
}

export function postListOptions(params?: PostListParams) {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.category) searchParams.set('category', params.category)

  return queryOptions({
    queryKey: queryKeys.posts.list(params),
    queryFn: () => adminApi.get(`${stripLeadingSlash(ENDPOINTS.blog.posts)}?${searchParams}`).json<PostListResponse>(),
  })
}

export function postDetailOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.posts.detail(slug),
    queryFn: () => adminApi.get(stripLeadingSlash(ENDPOINTS.blog.postBySlug(slug))).json<Post>(),
  })
}
