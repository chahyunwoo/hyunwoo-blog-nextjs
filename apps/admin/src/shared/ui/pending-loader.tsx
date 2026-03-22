import { Loader2 } from 'lucide-react'

export function PendingLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-6 animate-spin" />
    </div>
  )
}
