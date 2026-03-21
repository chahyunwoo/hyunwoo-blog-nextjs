import { notFound } from 'next/navigation'
import { apiFetch } from '@hyunwoo/shared/api'
import type { Params } from '@hyunwoo/shared/types'
import { PostBody } from '@/entities/post/ui/post-body'
import { InnerContainer } from '@/shared/ui/inner-container'

interface PreviewPost {
  slug: string
  title: string
  description: string
  content: string
  category: string
  tags: { id: number; name: string }[]
  thumbnailUrl: string | null
  published: boolean
  createdAt: string
}

export default async function PreviewSlugPage({
  params,
  searchParams,
}: Params<{ slug: string }> & { searchParams: Promise<{ token?: string }> }) {
  const { slug } = await params
  const { token } = await searchParams

  if (!token) notFound()

  const post = await apiFetch<PreviewPost>(`/api/blog/posts/${slug}/preview?token=${token}`)

  if (!post) notFound()

  return (
    <InnerContainer className="py-4 md:py-8">
      <div className="flex justify-center gap-10">
        <article className="prose dark:prose-invert tracking-wide leading-relaxed max-w-4xl w-full min-w-0">
          <div className="mb-8 pb-6 border-b border-border">
            <span className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded font-medium">
              미리보기
            </span>
            <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
            {post.description && <p className="text-muted-foreground mt-0">{post.description}</p>}
          </div>
          <PostBody
            post={{
              meta: {
                title: post.title,
                description: post.description,
                date: post.createdAt,
                tags: post.tags.map(t => t.name),
                mainTag: post.category,
                thumbnail: post.thumbnailUrl ?? '',
                published: post.published,
                slug: post.slug,
              },
              content: post.content,
            }}
          />
        </article>
      </div>
    </InnerContainer>
  )
}
