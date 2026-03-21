import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요'),
  description: z.string().optional().or(z.literal('')),
  content: z.string().min(1, '내용을 입력하세요'),
  category: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().url('유효한 URL을 입력하세요').optional().or(z.literal('')),
  published: z.boolean(),
})

export type PostFormValues = z.infer<typeof postSchema>
