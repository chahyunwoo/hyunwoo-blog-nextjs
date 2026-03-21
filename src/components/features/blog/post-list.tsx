'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { Post } from '@/types'
import { PostCard } from './post-card'

interface PostListProps {
  posts: Post[]
  total: number
  page: number
  totalPages: number
}

export function PostList({ posts, page, totalPages }: PostListProps) {
  const searchParams = useSearchParams()

  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (targetPage <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(targetPage))
    }
    const qs = params.toString()
    return qs ? `/?${qs}` : '/'
  }

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link href={`/blog/${post.meta.slug}`} key={post.meta.slug} className="block" prefetch={index < 4}>
            <PostCard post={post} index={index} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Link href={buildPageUrl(Math.max(1, page - 1))} prefetch={false}>
            <Button
              variant="ghost"
              size="icon"
              disabled={page <= 1}
              aria-label="이전 페이지"
              className="h-8 w-8 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link key={p} href={buildPageUrl(p)} prefetch={false}>
              <Button
                variant={p === page ? 'default' : 'ghost'}
                size="icon"
                aria-label={`${p} 페이지`}
                className="h-8 w-8 text-sm cursor-pointer"
              >
                {p}
              </Button>
            </Link>
          ))}

          <Link href={buildPageUrl(Math.min(totalPages, page + 1))} prefetch={false}>
            <Button
              variant="ghost"
              size="icon"
              disabled={page >= totalPages}
              aria-label="다음 페이지"
              className="h-8 w-8 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
