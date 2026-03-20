'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Post } from '@/types'
import { PostCard } from './post-card'

const POSTS_PER_PAGE = 9

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post, index) => (
          <Link href={`/blog/${post.meta.slug}`} key={post.meta.slug} className="block" prefetch={index < 4}>
            <PostCard post={post} index={start + index} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-8 w-8 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Button
              key={p}
              variant={p === page ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setPage(p)}
              className="h-8 w-8 text-sm cursor-pointer"
            >
              {p}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-8 w-8 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
