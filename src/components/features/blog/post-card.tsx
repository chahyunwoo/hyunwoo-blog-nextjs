import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { estimateReadingTime, formatDate } from '@/lib/utils'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  const isLCP = index === 0
  const isAboveTheFold = index < 6
  const readTime = estimateReadingTime(post.content)

  return (
    <article className="group h-full flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
      {post.meta.thumbnail && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={post.meta.thumbnail}
            alt={post.meta.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 350px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading={isAboveTheFold ? 'eager' : 'lazy'}
            priority={isAboveTheFold}
            fetchPriority={isLCP ? 'high' : undefined}
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30' viewBox='0 0 40 30'%3E%3Crect width='40' height='30' fill='%23f1f5f9'/%3E%3C/svg%3E"
          />
          <Badge className="absolute top-2 left-2 text-[10px] bg-background/80 text-foreground backdrop-blur-sm border-none">
            {post.meta.mainTag}
          </Badge>
        </div>
      )}
      <div className="flex flex-col grow p-4 gap-2.5">
        <h3 className="text-base font-semibold tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
          {post.meta.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 grow">{post.meta.description}</p>
        <div className="flex gap-1.5 items-center">
          {post.meta.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-[10px] font-normal shrink-0">
              {tag}
            </Badge>
          ))}
          {post.meta.tags.length > 3 && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-[10px] font-normal opacity-50 shrink-0 cursor-default">
                    +{post.meta.tags.length - 3}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="flex gap-1.5 flex-wrap max-w-48">
                  {post.meta.tags.slice(3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.meta.date)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            읽는 데 약 {readTime}분
          </div>
        </div>
      </div>
    </article>
  )
}
