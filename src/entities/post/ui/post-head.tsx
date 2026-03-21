import { Calendar, Clock } from 'lucide-react'
import { estimateReadingTime, formatDate } from '@/shared/lib/utils'
import type { Post } from '@/shared/types'
import { Badge } from '@/shared/ui/badge'

export function PostHead({ post }: { post: Post }) {
  const readTime = estimateReadingTime(post.content)

  return (
    <header className="mt-4 md:mt-12 mb-6 md:mb-10 text-center">
      <Badge variant="secondary" className="text-primary mb-3">
        {post.meta.mainTag}
      </Badge>
      <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">{post.meta.title}</h1>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">{post.meta.description}</p>
      <div className="flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground pb-4 md:pb-8 border-b border-border">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(post.meta.date)}
        </div>
        <span className="text-border">|</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          읽는 데 약 {readTime}분
        </div>
      </div>
    </header>
  )
}
