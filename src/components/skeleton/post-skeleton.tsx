import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PostSkeletonProps {
  count?: number;
}

export function PostSkeleton({ count = 6 }: PostSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="h-full flex flex-col overflow-hidden border-none py-0 pb-4 rounded-sm gap-2"
        >
          <div className="relative w-full aspect-video md:aspect-[4/3] overflow-hidden">
            <Skeleton className="absolute inset-0 w-full h-full rounded-t-lg" />
          </div>
          <CardHeader className="py-2">
            <div className="flex items-center justify-between gap-2 mb-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-7 w-full" />
          </CardHeader>
          <CardContent className="flex-grow">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
