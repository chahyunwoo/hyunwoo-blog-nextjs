import { Skeleton } from '@hyunwoo/ui'

export function BlogSidebarSkeleton() {
  return (
    <aside className="w-full max-w-[240px] border-r pt-6 pb-12 pr-4 hidden md:flex md:flex-col gap-6">
      <div className="space-y-2 px-3">
        <Skeleton className="h-3 w-20 mb-3" />
        {Array.from({ length: 5 }, (_, i) => `cat-skeleton-${i}`).map(id => (
          <div key={id} className="flex justify-between items-center py-1.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-3 w-6" />
          </div>
        ))}
      </div>

      <hr className="border-border mx-3" />

      <div className="px-3">
        <Skeleton className="h-3 w-12 mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }, (_, i) => `tag-skeleton-${i}`).map(id => (
            <Skeleton key={id} className="h-5 w-14 rounded-full" />
          ))}
        </div>
      </div>

      <hr className="border-border mx-3" />

      <div className="px-3">
        <Skeleton className="h-3 w-14 mb-3" />
        {Array.from({ length: 5 }, (_, i) => `recent-skeleton-${i}`).map(id => (
          <div key={id} className="py-2 space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
