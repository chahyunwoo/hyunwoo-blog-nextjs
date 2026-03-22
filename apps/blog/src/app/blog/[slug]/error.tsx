'use client'

import { ErrorFallback } from '@/shared/ui'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorFallback
      title="포스트를 불러올 수 없습니다"
      description="서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      backLabel="목록으로"
      backHref="/"
      reset={reset}
    />
  )
}
