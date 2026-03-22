import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useForm } from 'react-hook-form'
import { login } from '@/entities/auth'
import { type LoginForm, loginSchema } from '@/shared/schemas'

export function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const loginMutation = useMutation({
    mutationFn: (values: LoginForm) => login(values.username, values.password),
    onSuccess: () => navigate({ to: '/' }),
    onError: async (e: Error) => {
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
    },
  })

  return (
    <Stack align="center" justify="center" mih="100vh" p="md">
      <Card shadow="sm" padding="xl" radius="md" withBorder w={400} maw="100%">
        <Title order={2} ta="center" mb="md">
          hyunwoo.dev Admin
        </Title>
        <Text size="sm" c="dimmed" ta="center" mb="xl">
          관리자 로그인
        </Text>

        <form onSubmit={handleSubmit(values => loginMutation.mutate(values))}>
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
            <Button type="submit" fullWidth loading={loginMutation.isPending}>
              로그인
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  )
}
