import { InnerContainer } from '@/shared/ui/inner-container'
import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
  return (
    <InnerContainer className="py-4 md:py-8">
      <div className="max-w-4xl mx-auto min-h-[80vh]">
        <div className="text-center mb-8 md:mb-12 mt-4 md:mt-12">
          <Skeleton className="h-6 w-20 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-9 md:h-12 w-3/4 mx-auto mb-3" />
          <Skeleton className="h-5 w-1/2 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-4 pb-6 border-b border-border">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="space-y-5 pt-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-60 w-full rounded-lg" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
    </InnerContainer>
  )
}
