import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, toast } from '@hyunwoo/ui'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { Loader2 } from 'lucide-react'
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
      toast.error(message)
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-[400px] max-w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">hyunwoo.dev Admin</CardTitle>
          <p className="text-sm text-muted-foreground text-center">관리자 로그인</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(values => loginMutation.mutate(values))} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">아이디</Label>
              <Input id="username" placeholder="username" {...register('username')} />
              {errors.username && <p className="text-xs text-destructive mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="password" {...register('password')} />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending && <Loader2 className="size-4 animate-spin" />}
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
