import { NotFoundFallback } from '@/shared/ui/error'

export default function PostNotFound() {
  return (
    <NotFoundFallback
      description="요청하신 포스트가 존재하지 않거나 삭제되었습니다."
      backLabel="목록으로"
      backHref="/"
    />
  )
}
