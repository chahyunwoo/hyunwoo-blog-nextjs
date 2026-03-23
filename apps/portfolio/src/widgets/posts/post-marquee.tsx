'use client'

import { BASE_URL } from '@hyunwoo/shared/config'
import { ArrowUpRight } from 'lucide-react'
import type { RecentPost } from '@/entities/portfolio'

interface PostMarqueeProps {
  posts: RecentPost[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function PostMarquee({ posts }: PostMarqueeProps) {
  if (posts.length === 0) return null

  const doubled = [...posts, ...posts]

  return (
    <section className="py-16 overflow-hidden">
      <p className="text-sm text-muted-foreground text-center mb-8">
        Latest from my{' '}
        <a href={BASE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          blog
        </a>
      </p>

      <div className="relative group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {doubled.map((post, i) => (
            <a
              key={`${post.id}-${i}`}
              href={`${BASE_URL}/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 shrink-0 px-8 py-4 mx-3 rounded-xl glass hover:bg-white/10 transition-colors group/item"
            >
              <span className="text-xs text-muted-foreground whitespace-nowrap">{post.category}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{post.title}</span>
              <span className="text-xs text-muted-foreground/60 whitespace-nowrap">{formatDate(post.publishedAt)}</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
