'use client'

import { ArrowRight, FileText, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { formatDate } from '@/lib/utils'
import { useSearchStore } from '@/stores/search-store'
import type { PostMeta } from '@/types'

interface SearchCommandProps {
  posts: PostMeta[]
}

export function SearchCommand({ posts }: SearchCommandProps) {
  const { isOpen, open: openSearch, close: closeSearch, toggle: toggleSearch } = useSearchStore()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSearch])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 200)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery.trim()) return []

    const q = debouncedQuery.toLowerCase()
    return posts.filter(
      post =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some(tag => tag.toLowerCase().includes(q)) ||
        post.mainTag.toLowerCase().includes(q),
    )
  }, [posts, debouncedQuery])

  const groupedPosts = useMemo(() => {
    const groups = new Map<string, PostMeta[]>()
    for (const post of filteredPosts) {
      const existing = groups.get(post.mainTag) || []
      existing.push(post)
      groups.set(post.mainTag, existing)
    }
    return groups
  }, [filteredPosts])

  const handleSelect = useCallback(
    (slug: string) => {
      closeSearch()
      router.push(`/blog/${slug}`)
    },
    [router, closeSearch],
  )

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (value) openSearch()
      else closeSearch()
    },
    [openSearch, closeSearch],
  )

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        aria-label="검색"
        className="flex items-center gap-2 px-2.5 py-1 text-sm text-muted-foreground rounded-md sm:border sm:border-input bg-transparent sm:bg-background hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline text-xs">검색</span>
        <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1 text-[10px] font-mono text-muted-foreground leading-5">
          &#8984;K
        </kbd>
      </button>

      <CommandDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        title="포스트 검색"
        description="제목, 태그, 카테고리로 검색합니다"
        showCloseButton={false}
      >
        <CommandInput placeholder="검색어를 입력하세요..." value={query} onValueChange={setQuery} />
        <CommandList className="max-h-[400px]">
          {debouncedQuery.trim() === '' ? (
            <div className="flex flex-col items-center justify-center py-14 text-muted-foreground">
              <Search className="h-10 w-10 mb-4 opacity-20" />
              <p className="text-sm">제목, 태그, 카테고리로 검색해보세요</p>
              <p className="text-xs mt-1 opacity-60">ESC로 닫기</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <CommandEmpty>
              <div className="flex flex-col items-center py-6">
                <p className="text-sm">&quot;{debouncedQuery}&quot;에 대한 검색 결과가 없습니다</p>
                <p className="text-xs mt-1 text-muted-foreground">다른 키워드로 검색해보세요</p>
              </div>
            </CommandEmpty>
          ) : (
            <>
              <div className="px-4 py-2 text-xs text-muted-foreground">{filteredPosts.length}개의 포스트</div>
              {Array.from(groupedPosts.entries()).map(([category, categoryPosts]) => (
                <CommandGroup key={category} heading={category}>
                  {categoryPosts.map(post => (
                    <CommandItem
                      key={post.slug}
                      value={post.slug}
                      onSelect={() => handleSelect(post.slug)}
                      className="cursor-pointer group py-3"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground group-data-[selected=true]:text-primary" />
                      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                        <span className="truncate font-medium text-sm">{post.title}</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] text-muted-foreground">{formatDate(post.date)}</span>
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px] py-0 h-4">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-data-[selected=true]:opacity-50 transition-opacity" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
