import { ENDPOINTS } from '@hyunwoo/shared/api'
import { toast } from '@hyunwoo/ui'
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
      toast.success(`"${data.title}" 포스트가 생성되었습니다.`)
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
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
      toast.success(`"${data.title}" 포스트가 수정되었습니다.`)
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => adminApi.delete(stripLeadingSlash(ENDPOINTS.blog.postBySlug(slug))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      toast.success('포스트가 삭제되었습니다.')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
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
      toast.success('썸네일이 업로드되었습니다.')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}
