import { InnerContainer } from '@/shared/ui/inner-container'
import { AboutSkeleton } from '@/shared/ui/skeletons'

export default function Loading() {
  return (
    <InnerContainer className="py-12">
      <AboutSkeleton />
    </InnerContainer>
  )
}
