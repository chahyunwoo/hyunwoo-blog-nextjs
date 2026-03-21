'use client'

import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { InnerContainer } from '@/shared/ui/inner-container'

interface ErrorFallbackProps {
  title: string
  description: string
  backLabel: string
  backHref: string
  reset: () => void
}

export function ErrorFallback({ title, description, backLabel, backHref, reset }: ErrorFallbackProps) {
  return (
    <InnerContainer className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <AlertCircle className="h-12 w-12 text-destructive opacity-60" />
      <div>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-3">
        <Link href={backHref}>
          <Button variant="outline" className="gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Button>
        </Link>
        <Button variant="outline" onClick={reset} className="gap-2 cursor-pointer">
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
      </div>
    </InnerContainer>
  )
}
