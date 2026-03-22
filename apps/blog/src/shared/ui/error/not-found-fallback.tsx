import Link from 'next/link'
import { Button } from '../button'
import { InnerContainer } from '../inner-container'

interface NotFoundFallbackProps {
  title?: string
  description: string
  backLabel: string
  backHref: string
}

export function NotFoundFallback({ title = 'Not Found', description, backLabel, backHref }: NotFoundFallbackProps) {
  return (
    <InnerContainer className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Button variant="outline" asChild>
        <Link href={backHref}>{backLabel}</Link>
      </Button>
    </InnerContainer>
  )
}
