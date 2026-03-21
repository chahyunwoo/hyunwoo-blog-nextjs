'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/shared/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <AlertCircle className="h-12 w-12 text-destructive opacity-60" />
      <div>
        <h2 className="text-lg font-semibold mb-1">문제가 발생했습니다</h2>
        <p className="text-sm text-muted-foreground">잠시 후 다시 시도해주세요.</p>
      </div>
      <Button variant="outline" onClick={reset} className="gap-2 cursor-pointer">
        <RefreshCw className="h-4 w-4" />
        다시 시도
      </Button>
    </div>
  )
}
