import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, '아이디를 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
})

export type LoginForm = z.infer<typeof loginSchema>
