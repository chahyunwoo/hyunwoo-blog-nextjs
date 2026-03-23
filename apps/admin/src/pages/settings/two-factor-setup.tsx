import { Button, Card, CardContent, CardHeader, CardTitle, toast } from '@hyunwoo/ui'
import { useMutation } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { Copy, Loader2, ShieldCheck } from 'lucide-react'
import type { TwoFactorSetupResponse } from '@/entities/auth'
import { setupTwoFactor } from '@/entities/auth'

export function TwoFactorSetup() {
  const setupMutation = useMutation({
    mutationFn: setupTwoFactor,
    onError: async (e: Error) => {
      let message = '2FA 설정에 실패했습니다'
      if (e instanceof HTTPError) {
        const body = await e.response.json().catch(() => null)
        message = body?.message ?? `HTTP ${e.response.status}`
      }
      toast.error(message)
    },
  })

  const data: TwoFactorSetupResponse | undefined = setupMutation.data

  const copySecret = () => {
    if (!data?.secret) return
    navigator.clipboard.writeText(data.secret)
    toast.success('시크릿 키가 복사되었습니다')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" />
          <CardTitle className="text-lg">2FA (Two-Factor Authentication)</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Google Authenticator 또는 1Password에 등록하여 보안을 강화하세요.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!data ? (
          <Button type="button" onClick={() => setupMutation.mutate()} disabled={setupMutation.isPending}>
            {setupMutation.isPending && <Loader2 className="size-4 animate-spin" />}
            2FA 설정 시작
          </Button>
        ) : (
          <>
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <img src={data.qrCode} alt="2FA QR Code" className="size-48" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">수동 입력용 시크릿 키</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-muted px-3 py-2 rounded-md font-mono break-all">{data.secret}</code>
                <Button type="button" variant="outline" size="icon" onClick={copySecret}>
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>1. 인증 앱에서 QR 코드를 스캔하거나 시크릿 키를 수동 입력하세요.</p>
              <p>2. 등록 후 다음 로그인부터 6자리 코드가 요구됩니다.</p>
              <p>3. 이 QR 코드는 다시 표시되지 않으니 안전한 곳에 백업하세요.</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
