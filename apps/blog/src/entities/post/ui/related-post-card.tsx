import { BLUR_DATA_URL } from '@hyunwoo/shared/config'
import { formatDate } from '@hyunwoo/shared/lib'
import type { Post } from '@hyunwoo/shared/types'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/shared/ui'

export function RelatedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.meta.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border hover:border-primary/30 hover:shadow-md transition-all h-auto sm:h-[260px]"
    >
      {post.meta.thumbnail ? (
        <div className="relative w-full h-[130px] shrink-0 overflow-hidden bg-muted hidden sm:block">
          <Image
            src={`${post.meta.thumbnail}?v=${post.meta.updatedAt}`}
            alt={post.meta.title}
            fill
            sizes="33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
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
