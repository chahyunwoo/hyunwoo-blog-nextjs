import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { getRelatedPosts } from '@/services/post'
import type { Post } from '@/types'

interface RelatedPostsProps {
  slug: string
}

function RelatedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.meta.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border hover:border-primary/30 hover:shadow-md transition-all h-auto sm:h-[260px]"
    >
      {post.meta.thumbnail ? (
        <div className="relative w-full h-[130px] shrink-0 overflow-hidden bg-muted hidden sm:block">
          <Image
            src={post.meta.thumbnail}
            alt={post.meta.title}
            fill
            sizes="33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-[130px] shrink-0 bg-muted hidden sm:block" />
      )}
      <div className="flex flex-col grow p-3 gap-2">
        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {post.meta.title}
        </h4>
        <div className="flex items-center gap-2 mt-auto">
          <Badge variant="outline" className="text-[10px] shrink-0">
            {post.meta.mainTag}
          </Badge>
          <span className="text-[10px] text-muted-foreground">{formatDate(post.meta.date)}</span>
        </div>
      </div>
    </Link>
  )
}

export async function RelatedPosts({ slug }: RelatedPostsProps) {
  const { related, recommended } = await getRelatedPosts(slug)
  const allPosts = [...related, ...recommended]

  if (allPosts.length === 0) return null

  const hasOnlyRelated = related.length === 3
  const hasOnlyRecommended = recommended.length === 3
  const isMixed = related.length > 0 && recommended.length > 0 && !hasOnlyRelated && !hasOnlyRecommended

  return (
    <div className="mt-4 pt-8 border-t border-border not-prose">
      {!isMixed && (
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full" />
          {hasOnlyRelated ? '연관 게시글' : '추천 게시글'}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isMixed ? (
          <>
            {related.map((post, i) => (
              <div key={post.meta.slug} className={i === related.length - 1 ? 'sm:border-r sm:pr-4 border-border' : ''}>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${i === 0 ? 'text-muted-foreground' : 'hidden sm:flex sm:invisible'}`}
                >
                  <span className="w-1 h-4 bg-primary rounded-full" />
                  연관 게시글
                </p>
                <RelatedPostCard post={post} />
              </div>
            ))}
            {recommended.map((post, i) => (
              <div key={post.meta.slug}>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${i === 0 ? 'text-muted-foreground' : 'hidden sm:flex sm:invisible'}`}
                >
                  <span className="w-1 h-4 bg-primary rounded-full" />
                  추천 게시글
                </p>
                <RelatedPostCard post={post} />
              </div>
            ))}
          </>
        ) : (
          allPosts.map(post => <RelatedPostCard key={post.meta.slug} post={post} />)
        )}
      </div>
    </div>
  )
}
