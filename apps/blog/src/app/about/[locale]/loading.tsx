import { AboutSkeleton, InnerContainer } from '@/shared/ui'

export default function Loading() {
  return (
    <InnerContainer className="py-12">
      <AboutSkeleton />
    </InnerContainer>
  )
}
