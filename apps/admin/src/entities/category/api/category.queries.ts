import { toast } from '@hyunwoo/ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import { getErrorMessage } from '@/shared/lib'
import type { Category, CreateCategoryBody } from '../model'

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => adminApi.get('api/blog/categories').json<Category[]>(),
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateCategoryBody) => adminApi.post('api/blog/categories', { json: body }).json<Category>(),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
      toast.success(`"${data.category}" 카테고리가 생성되었습니다.`)
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ category, ...body }: { category: string } & Partial<CreateCategoryBody>) =>
      adminApi.put(`api/blog/categories/${encodeURIComponent(category)}`, { json: body }).json<Category>(),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
      toast.success(`"${data.category}" 카테고리가 수정되었습니다.`)
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: () => adminApi.get('api/blog/tags').json<{ tags: { name: string; count: number }[]; total: number }>(),
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (category: string) => adminApi.delete(`api/blog/categories/${encodeURIComponent(category)}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
      toast.success('카테고리가 삭제되었습니다.')
    },
    onError: async e => {
      toast.error(await getErrorMessage(e))
    },
  })
}
