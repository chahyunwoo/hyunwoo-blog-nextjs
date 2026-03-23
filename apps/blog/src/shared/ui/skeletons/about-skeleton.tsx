import { Skeleton } from '@hyunwoo/ui'

export function AboutSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="flex gap-8 items-center justify-between flex-col-reverse md:flex-row pb-8 border-b border-border">
        <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2 mt-3">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-[180px] w-[180px] rounded-full" />
      </div>

      <div className="py-8 border-b border-border">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5 mt-2" />
        <Skeleton className="h-4 w-3/5 mt-2" />
      </div>

      <div className="py-8 border-b border-border">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => `skill-${i}`).map(id => (
            <div key={id}>
              <Skeleton className="h-3 w-20 mb-2" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }, (_, j) => `${id}-item-${j}`).map(itemId => (
                  <Skeleton key={itemId} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8 border-b border-border">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-6 ml-3">
          {Array.from({ length: 2 }, (_, i) => `edu-${i}`).map(id => (
            <div key={id} className="pl-7">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56 mt-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="py-8 border-b border-border">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => `proj-${i}`).map(id => (
            <div key={id} className="rounded-lg border p-4 space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-1">
                <Skeleton className="h-4 w-12 rounded-full" />
                <Skeleton className="h-4 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8 border-b border-border">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-8 ml-3">
          {Array.from({ length: 3 }, (_, i) => `exp-${i}`).map(id => (
            <div key={id} className="pl-7 space-y-2">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-40" />
              <div className="space-y-1.5 mt-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
