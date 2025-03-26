import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/common/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/common/card";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-none py-0 pb-4 rounded-sm gap-2">
      {post.meta.thumbnail && (
        <div className="relative w-full aspect-video md:aspect-[4/3] overflow-hidden">
          <Image
            src={post.meta.thumbnail}
            alt={post.meta.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 350px"
            className="object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <CardHeader className="py-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-teal-500">
            {post.meta.mainTag}
          </Badge>
          <time className="text-xs text-muted-foreground tracking-wide">
            {formatDate(post.meta.date)}
          </time>
        </div>
        <h3 className="text-lg font-bold tracking-tight">{post.meta.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2">
          {post.meta.description}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        {post.meta.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
