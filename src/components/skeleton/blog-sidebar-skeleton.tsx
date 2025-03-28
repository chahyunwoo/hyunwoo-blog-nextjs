"use client";

import { Skeleton } from "../ui/skeleton";

interface BlogSidebarSkeletonProps {
  count?: number;
}

export function BlogSidebarSkeleton({ count = 6 }: BlogSidebarSkeletonProps) {
  return (
    <aside className="w-full max-w-[200px] border-r pt-6 pb-12 px-2 pr-2 hidden md:block">
      <nav className="space-y-6">
        <div className="space-y-1">
          <div className="flex justify-between items-center px-2 py-1.5 rounded-md w-full">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-4 w-6" />
          </div>

          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center px-2 py-1.5 rounded-md w-full">
                <Skeleton className="h-5 w-24" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-4 w-4 ml-2" />
                </div>
              </div>

              {index % 2 === 0 && (
                <div className="pl-4 pt-1 space-y-1">
                  {Array.from({
                    length: Math.floor(Math.random() * 3) + 1,
                  }).map((_, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex justify-between items-center px-2 py-1 rounded-md w-full"
                    >
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-4" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
