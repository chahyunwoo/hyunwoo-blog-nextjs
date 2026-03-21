import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { adminApi } from '@/shared/api'
import { queryKeys } from '@/shared/config'

interface Category {
  id: number
  name: string
  icon: string
  sortOrder: number
  count: number
}

interface CreateCategoryBody {
  name: string
  icon: string
  sortOrder?: number
}

async function getErrorMessage(e: unknown): Promise<string> {
  if (e instanceof HTTPError) {
    const body = await e.response.json().catch(() => null)
    if (body?.message) return Array.isArray(body.message) ? body.message[0] : body.message
    return `HTTP ${e.response.status}`
  }
  return e instanceof Error ? e.message : '알 수 없는 오류'
}

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
      notifications.show({
        title: '카테고리 생성',
        message: `"${data.name}" 카테고리가 생성되었습니다.`,
        color: 'teal',
      })
    },
    onError: async e => {
      notifications.show({ title: '생성 실패', message: await getErrorMessage(e), color: 'red' })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...body }: { id: number } & Partial<CreateCategoryBody>) =>
      adminApi.put(`api/blog/categories/${id}`, { json: body }).json<Category>(),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
      notifications.show({
        title: '카테고리 수정',
        message: `"${data.name}" 카테고리가 수정되었습니다.`,
        color: 'teal',
      })
    },
    onError: async e => {
      notifications.show({ title: '수정 실패', message: await getErrorMessage(e), color: 'red' })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => adminApi.delete(`api/blog/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
      notifications.show({ title: '카테고리 삭제', message: '카테고리가 삭제되었습니다.', color: 'teal' })
    },
    onError: async e => {
      notifications.show({ title: '삭제 실패', message: await getErrorMessage(e), color: 'red' })
    },
  })
}

export type { Category, CreateCategoryBody }
