import { AlertCircle } from 'lucide-react'

interface SectionErrorProps {
  label: string
}

export function SectionError({ label }: SectionErrorProps) {
  return (
    <div className="flex items-center gap-2 py-4 text-destructive/70">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p className="text-sm">{label}을(를) 불러올 수 없습니다</p>
    </div>
  )
}
