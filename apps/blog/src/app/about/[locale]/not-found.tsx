import { NotFoundFallback } from '@/shared/ui'

export default function AboutNotFound() {
  return (
    <NotFoundFallback
      description="해당 언어의 프로필을 찾을 수 없습니다."
      backLabel="한국어 프로필로 이동"
      backHref="/about/ko"
    />
  )
}
