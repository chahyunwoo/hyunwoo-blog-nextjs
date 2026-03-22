import { Skeleton } from '../skeleton'

interface PostSkeletonProps {
  count?: number
}

export function PostSkeleton({ count = 9 }: PostSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => `post-skeleton-${i}`).map(id => (
        <div key={id} className="flex flex-col overflow-hidden rounded-lg border bg-card">
          <Skeleton className="w-full aspect-video" />
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="flex gap-1.5 pt-1">
              <Skeleton className="h-4 w-12 rounded-full" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <div className="flex justify-between pt-2 border-t border-border/50">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
