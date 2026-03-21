import { NotFoundFallback } from '@/shared/ui/error'

export default function NotFound() {
  return (
    <NotFoundFallback
      description="The page you are looking for does not exist."
      backLabel="Go back to home"
      backHref="/"
    />
  )
}
