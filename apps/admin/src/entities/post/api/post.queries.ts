import { ENDPOINTS } from '@hyunwoo/shared/api'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { adminApi, uploadFile } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import { getErrorMessage, stripLeadingSlash } from '@/shared/lib'
import type { CreatePostBody, Post, PostListParams, UpdatePostBody } from '../model'
import { postDetailOptions, postListOptions } from './post.options'

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
