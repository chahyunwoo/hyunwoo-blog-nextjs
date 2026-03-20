import { Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { estimateReadingTime, formatDate } from '@/lib/utils'
import type { Post } from '@/types'

export function PostHead({ post }: { post: Post }) {
  const readTime = estimateReadingTime(post.content)

  return (
    <header className="mt-6 md:mt-12 mb-10 text-center">
      <Badge variant="secondary" className="text-primary mb-4">
        {post.meta.mainTag}
      </Badge>
      <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{post.meta.title}</h1>
      <p className="text-muted-foreground mb-6">{post.meta.description}</p>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
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
