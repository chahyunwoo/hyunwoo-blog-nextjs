import { InnerContainer } from '@/shared/ui/inner-container'
import { PostSkeleton } from '@/shared/ui/post-skeleton'

export default function Loading() {
  return (
    <InnerContainer className="flex flex-col md:flex-row md:pl-0!">
      <div className="hidden md:block w-full max-w-[240px] border-r pt-6 pr-4" />
      <div className="flex-1 pt-6 pb-12 md:pl-8 min-h-[80vh]">
        <PostSkeleton />
      </div>
    </InnerContainer>
  )
}
