import type { Post } from '@hyunwoo/shared/types'
import { Tag } from 'lucide-react'
import { Badge, CopyButton } from '@/shared/ui'
import { Giscus } from './giscus'
import { RelatedPosts } from './related-posts'

interface PostFooterProps {
  post: Post
  slug: string
}

export function PostFooter({ post, slug }: PostFooterProps) {
  return (
    <div className="space-y-8 mb-20">
      <div>
        <div className="flex justify-between mb-4">
          <div className="pt-8 flex-1">
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-2 shrink-0">
                <Tag className="h-3 w-3 text-primary" />
                <span className="font-medium text-sm">Tags:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {post?.meta.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="hover:bg-primary/10 transition-colors cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 pt-8 relative -top-1.5">
            <CopyButton description="링크가 복사되었습니다." icon="Share2" useCurrentUrl />
          </div>
        </div>
        <RelatedPosts slug={slug} />
        <div className="mt-12">
          <Giscus />
        </div>
      </div>
    </div>
  )
}
