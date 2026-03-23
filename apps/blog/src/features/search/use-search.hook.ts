'use client'

import { apiClientFetch, ENDPOINTS } from '@hyunwoo/shared/api'
import type { Post } from '@hyunwoo/shared/types'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ApiSearchPost {
  slug: string
  title: string
  description: string
  category: string
  readingTime?: number
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
      readingTime: p.readingTime ?? 1,
    },
    content: '',
  }
}

export function useSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState<{ posts: Post[]; grouped: Record<string, Post[]> }>({ posts: [], grouped: {} })
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults({ posts: [], grouped: {} })
      return
    }

    const controller = new AbortController()

    const fetchResults = async () => {
      setLoading(true)
      try {
        const data = await apiClientFetch<{ posts: ApiSearchPost[]; grouped: Record<string, ApiSearchPost[]> }>(
          `${ENDPOINTS.blog.search}?q=${encodeURIComponent(debouncedQuery)}`,
          controller.signal,
        )

        if (!data) {
          setResults({ posts: [], grouped: {} })
          return
        }

        const posts = (data.posts || []).map(toPost)
        const grouped: Record<string, Post[]> = {}
        if (data.grouped) {
          for (const [cat, catPosts] of Object.entries(data.grouped)) {
            grouped[cat] = catPosts.map(toPost)
          }
        }

        setResults({ posts, grouped })
      } catch {
        setResults({ posts: [], grouped: {} })
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
    return () => controller.abort()
  }, [debouncedQuery])

  const reset = useCallback(() => {
    setQuery('')
    setDebouncedQuery('')
    setResults({ posts: [], grouped: {} })
  }, [])

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

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    loading,
    reset,
    groupedEntries,
  }
}
