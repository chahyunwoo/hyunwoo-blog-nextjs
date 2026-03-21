import { AlertCircle } from 'lucide-react'

interface SidebarErrorProps {
  label: string
}

export function SidebarError({ label }: SidebarErrorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-3 text-destructive/70">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <p className="text-xs">{label}을(를) 불러올 수 없습니다</p>
    </div>
  )
}
