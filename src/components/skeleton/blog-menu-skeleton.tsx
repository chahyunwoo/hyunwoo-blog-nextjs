"use client";

import { Skeleton } from "@/components/common/skeleton";

export function BlogMenuSkeleton() {
  return (
    <div className="space-y-2 px-2 py-1">
      <div className="flex justify-between items-center px-2 py-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="pl-2 space-y-3 mt-1">
        <div className="flex justify-between items-center px-2 py-1.5">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3 w-5" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-center px-2 py-1.5">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-6" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
            <div className="pl-4 space-y-2">
              {[1, 2].map((j) => (
                <div
                  key={j}
                  className="flex justify-between items-center px-2 py-1"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-4" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
