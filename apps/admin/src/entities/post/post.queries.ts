import { ENDPOINTS } from '@hyunwoo/shared/api'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { adminApi, uploadFile } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import type { CreatePostBody, Post, PostListParams, UpdatePostBody } from './model'
import { postDetailOptions, postListOptions } from './post.options'

function stripLeadingSlash(path: string) {
  return path.startsWith('/') ? path.slice(1) : path
}

async function getErrorMessage(e: unknown): Promise<string> {
  if (e instanceof HTTPError) {
    const body = await e.response.json().catch(() => null)
    if (body?.message) return Array.isArray(body.message) ? body.message[0] : body.message
    return `HTTP ${e.response.status}`
  }
  return e instanceof Error ? e.message : '알 수 없는 오류'
}

export function usePostList(params?: PostListParams) {
  return useSuspenseQuery(postListOptions(params))
}

export function usePostDetail(slug: string) {
  return useSuspenseQuery(postDetailOptions(slug))
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreatePostBody) =>
      adminApi.post(stripLeadingSlash(ENDPOINTS.blog.posts), { json: body }).json<Post>(),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      notifications.show({ title: '포스트 생성', message: `"${data.title}" 포스트가 생성되었습니다.`, color: 'teal' })
    },
    onError: async e => {
      notifications.show({ title: '생성 실패', message: await getErrorMessage(e), color: 'red' })
    },
  })
}

export function useUpdatePost(slug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdatePostBody) =>
      adminApi.put(stripLeadingSlash(ENDPOINTS.blog.postBySlug(slug)), { json: body }).json<Post>(),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(slug) })
      notifications.show({ title: '포스트 수정', message: `"${data.title}" 포스트가 수정되었습니다.`, color: 'teal' })
    },
    onError: async e => {
      notifications.show({ title: '수정 실패', message: await getErrorMessage(e), color: 'red' })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => adminApi.delete(stripLeadingSlash(ENDPOINTS.blog.postBySlug(slug))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      notifications.show({ title: '포스트 삭제', message: '포스트가 삭제되었습니다.', color: 'teal' })
    },
    onError: async e => {
      notifications.show({ title: '삭제 실패', message: await getErrorMessage(e), color: 'red' })
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
      notifications.show({ title: '썸네일 업로드', message: '썸네일이 업로드되었습니다.', color: 'teal' })
    },
    onError: async e => {
      notifications.show({ title: '업로드 실패', message: await getErrorMessage(e), color: 'red' })
    },
  })
}
