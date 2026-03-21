'use client'

import { Skeleton } from '@/shared/ui/skeleton'

export function BlogMenuSkeleton() {
  return (
    <div className="space-y-1 px-4 py-2">
      {Array.from({ length: 5 }, (_, i) => `menu-skeleton-${i}`).map(id => (
        <div key={id} className="flex justify-between items-center py-1.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-3 w-6" />
        </div>
      ))}
    </div>
  )
}
