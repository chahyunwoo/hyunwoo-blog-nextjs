'use client'

import { apiFetch } from '@hyunwoo/shared/api'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { MdxComponents } from '@/shared/mdx'

const ALLOWED_ORIGINS = ['http://localhost:3100', 'https://admin.chahyunwoo.dev']

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const [source, setSource] = useState<Awaited<ReturnType<typeof serialize>> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [authorized, setAuthorized] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) return

    apiFetch<{ valid: boolean }>(`/api/auth/verify-preview?token=${token}`).then(result => {
      if (result?.valid) setAuthorized(true)
    })
  }, [searchParams])

  useEffect(() => {
    if (!authorized) return

    const handler = (e: MessageEvent) => {
      if (!ALLOWED_ORIGINS.includes(e.origin)) return
      if (e.data?.type !== 'mdx-preview') return

      if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(async () => {
        try {
          const mdxSource = await serialize(e.data.content, {
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkBreaks],
              development: process.env.NODE_ENV === 'development',
            },
          })
          setSource(mdxSource)
          setError(null)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'MDX 파싱 에러')
        }
      }, 300)
    }

    window.addEventListener('message', handler)
    return () => {
      window.removeEventListener('message', handler)
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [authorized])

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground text-sm">
        접근 권한이 없습니다.
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">MDX 파싱 에러</p>
          <pre className="text-xs text-red-500 dark:text-red-300 whitespace-pre-wrap">{error}</pre>
        </div>
      </div>
    )
  }

  if (!source) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground text-sm">
        에디터에서 내용을 입력하면 프리뷰가 표시됩니다.
      </div>
    )
  }

  return (
    <div className="flex justify-center py-4 md:py-8 px-4">
      <article className="prose dark:prose-invert tracking-wide leading-relaxed max-w-4xl w-full min-w-0">
        <MDXRemote {...source} components={MdxComponents} />
      </article>
    </div>
  )
}
