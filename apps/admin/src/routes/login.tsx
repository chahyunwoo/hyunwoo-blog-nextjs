import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { login, useAuth } from '@/entities/auth'

const loginSchema = z.object({
  username: z.string().min(1, '아이디를 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
})

type LoginForm = z.infer<typeof loginSchema>

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  if (isAuthenticated) {
    navigate({ to: '/' })
    return null
  }

  const onSubmit = async (values: LoginForm) => {
    setLoading(true)

    try {
      await login(values.username, values.password)
      navigate({ to: '/' })
    } catch (e) {
      let message = '알 수 없는 오류가 발생했습니다'
      if (e instanceof HTTPError) {
        const body = await e.response.json().catch(() => null)
        message = body?.message ?? `HTTP ${e.response.status}`
      }
      notifications.show({
        title: '로그인 실패',
        message,
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack align="center" justify="center" mih="100vh" p="md">
      <Card shadow="sm" padding="xl" radius="md" withBorder w={400} maw="100%">
        <Title order={2} ta="center" mb="md">
          hyunwoo.dev Admin
        </Title>
        <Text size="sm" c="dimmed" ta="center" mb="xl">
          관리자 로그인
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="아이디"
              placeholder="username"
              error={errors.username?.message}
              {...register('username')}
            />
            <PasswordInput
              label="비밀번호"
              placeholder="password"
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" fullWidth loading={loading}>
              로그인
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  )
}
