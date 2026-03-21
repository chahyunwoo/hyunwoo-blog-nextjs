import { AlertCircle } from 'lucide-react'

interface ApiErrorProps {
  message?: string
}

export function ApiError({ message = '데이터를 불러오는 데 실패했습니다.' }: ApiErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <AlertCircle className="h-8 w-8 mb-3 opacity-40" />
      <p className="text-sm">{message}</p>
      <p className="text-xs mt-1 opacity-60">잠시 후 다시 시도해주세요.</p>
    </div>
  )
}
