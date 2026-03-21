'use client'

import { ArrowRight, FileText, Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import type { Post } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''

interface ApiSearchPost {
  slug: string
  title: string
  description: string
  category: string
  createdAt: string
  tags: { name: string }[]
  thumbnailUrl?: string
}

function toPost(p: ApiSearchPost): Post {
  return {
    meta: {
      title: p.title,
      description: p.description,
      date: p.createdAt,
      mainTag: p.category,
      tags: p.tags.map(t => t.name),
      thumbnail: p.thumbnailUrl || '',
      published: true,
      slug: p.slug,
    },
    content: '',
  }
}

export function SearchCommand() {
  const { isOpen, open: openSearch, close: closeSearch, toggle: toggleSearch } = useSearchStore()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState<{ posts: Post[]; grouped: Record<string, Post[]> }>({ posts: [], grouped: {} })
  const [loading, setLoading] = useState(false)
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
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setDebouncedQuery('')
      setResults({ posts: [], grouped: {} })
    }
  }, [isOpen])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults({ posts: [], grouped: {} })
      return
    }

    const controller = new AbortController()

    const fetchResults = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/api/blog/posts/search?q=${encodeURIComponent(debouncedQuery)}`, {
          headers: { 'x-api-key': API_KEY },
          signal: controller.signal,
        })

        if (!res.ok) {
          setResults({ posts: [], grouped: {} })
          return
        }

        const data = await res.json()
        const posts = (data.posts || []).map(toPost)
        const grouped: Record<string, Post[]> = {}

        if (data.grouped) {
          for (const [cat, catPosts] of Object.entries(data.grouped)) {
            grouped[cat] = (catPosts as ApiSearchPost[]).map(toPost)
          }
        }

        setResults({ posts, grouped })
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setResults({ posts: [], grouped: {} })
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
    return () => controller.abort()
  }, [debouncedQuery])

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

  const groupedEntries =
    Object.keys(results.grouped).length > 0
      ? Object.entries(results.grouped)
      : results.posts.length > 0
        ? Object.entries(
            results.posts.reduce<Record<string, Post[]>>((acc, post) => {
              const cat = post.meta.mainTag
              if (!acc[cat]) acc[cat] = []
              acc[cat].push(post)
              return acc
            }, {}),
          )
        : []

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
        <div className="relative">
          <CommandInput placeholder="검색어를 입력하세요..." value={query} onValueChange={setQuery} />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
        <CommandList className="h-[60vh] sm:h-[500px] overflow-y-auto">
          {debouncedQuery.trim() === '' ? (
            <div className="flex flex-col items-center justify-center py-14 text-muted-foreground">
              <Search className="h-10 w-10 mb-4 opacity-20" />
              <p className="text-sm">제목, 태그, 카테고리로 검색해보세요</p>
              <p className="text-xs mt-1 opacity-60">ESC로 닫기</p>
            </div>
          ) : loading && results.posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-muted-foreground gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-sm">검색 중...</p>
            </div>
          ) : groupedEntries.length === 0 && !loading ? (
            <CommandEmpty>
              <div className="flex flex-col items-center py-8">
                <Search className="h-8 w-8 mb-3 opacity-20" />
                <p className="text-sm">&quot;{debouncedQuery}&quot;에 대한 검색 결과가 없습니다</p>
                <p className="text-xs mt-1 text-muted-foreground">다른 키워드로 검색해보세요</p>
              </div>
            </CommandEmpty>
          ) : (
            <>
              <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border/50">
                <span className="font-medium text-foreground">{results.posts.length}</span>개의 포스트
              </div>
              {groupedEntries.map(([category, categoryPosts]) => (
                <CommandGroup key={category} heading={`${category} (${categoryPosts.length})`}>
                  {categoryPosts.map(post => (
                    <CommandItem
                      key={post.meta.slug}
                      value={post.meta.slug}
                      onSelect={() => handleSelect(post.meta.slug)}
                      className="cursor-pointer group py-3 px-3"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground group-data-[selected=true]:text-primary transition-colors" />
                      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                        <span className="truncate font-medium text-sm group-data-[selected=true]:text-primary transition-colors">
                          {post.meta.title}
                        </span>
                        <p className="text-xs text-muted-foreground line-clamp-1">{post.meta.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] text-muted-foreground">{formatDate(post.meta.date)}</span>
                          {post.meta.tags.slice(0, 3).map(tag => (
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
