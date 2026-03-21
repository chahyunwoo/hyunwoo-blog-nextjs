import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요'),
  slug: z
    .string()
    .min(1, 'slug를 입력하세요')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '영문 소문자, 숫자, 하이픈만 사용 가능합니다'),
  description: z.string().min(1, '설명을 입력하세요'),
  content: z.string().min(1, '내용을 입력하세요'),
  category: z.string().min(1, '카테고리를 선택하세요'),
  tags: z.array(z.string()).min(1, '태그를 최소 1개 입력하세요'),
  thumbnailUrl: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
  published: z.boolean(),
})

export type PostFormValues = z.infer<typeof postSchema>
