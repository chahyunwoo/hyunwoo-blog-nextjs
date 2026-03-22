'use client'

import { ErrorFallback } from '@/shared/ui'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorFallback
      title="문제가 발생했습니다"
      description="잠시 후 다시 시도해주세요."
      backLabel="홈으로"
      backHref="/"
      reset={reset}
    />
  )
}
