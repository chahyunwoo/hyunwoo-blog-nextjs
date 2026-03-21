'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'
import { useSearchStore } from '@/stores/search-store'

interface SidebarTagCloudProps {
  tags: [string, number][]
  totalCount: number
}

export function SidebarTagCloud({ tags, totalCount }: SidebarTagCloudProps) {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag') || ''
  const openSearch = useSearchStore(state => state.open)

  return (
    <nav>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Tags</p>
      <div className="flex flex-wrap gap-2 px-3">
        {tags.map(([tag, count]) => {
          const isActive = currentTag === tag
          const href = isActive ? '/' : `/?tag=${tag}`

          return (
            <Link key={tag} href={href} prefetch={false}>
              <Badge
                variant={isActive ? 'default' : 'outline'}
                className={cn(
                  'text-[10px] transition-colors cursor-pointer min-h-[28px] py-1',
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
                )}
              >
                {tag}
                <span className={cn('ml-1', isActive ? 'text-primary-foreground/70' : 'opacity-50')}>{count}</span>
              </Badge>
            </Link>
          )
        })}
      </div>
      {totalCount > tags.length && (
        <div className="flex justify-end px-3 mt-2">
          <button
            type="button"
            onClick={openSearch}
            className="text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer underline underline-offset-2"
          >
            +{totalCount - tags.length} more
          </button>
        </div>
      )}
    </nav>
  )
}
