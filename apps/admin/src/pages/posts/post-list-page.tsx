import { formatDate } from '@hyunwoo/shared/lib'
import { Badge, Button, Card, CardContent, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@hyunwoo/ui'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeletePost, usePostList } from '@/entities/post'

export function PostListPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
  const { data } = usePostList({ page, limit: 20 })
  const deletePost = useDeletePost()

  const handleDelete = (slug: string, title: string) => {
    if (!window.confirm(`"${title}" 포스트를 삭제하시겠습니까?`)) return
    setDeletingSlug(slug)
    deletePost.mutate(slug, { onSettled: () => setDeletingSlug(null) })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button asChild>
          <Link to="/posts/new">
            <Plus className="size-4" />새 포스트
          </Link>
        </Button>
      </div>

      {!data || data.posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">포스트가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {data.posts.map(post => (
            <Card key={post.id} className="py-0">
              <CardContent className="flex items-center justify-between gap-2 py-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <Link to="/posts/$slug" params={{ slug: post.slug }} className="no-underline">
                      <span className="text-sm font-semibold line-clamp-1 text-foreground hover:text-primary transition-colors">
                        {post.title}
                      </span>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <span
                          className={`inline-block size-1.5 rounded-full mr-1 ${post.published ? 'bg-teal-500' : 'bg-gray-400'}`}
                        />
                        {post.published ? '발행' : '임시저장'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate({ to: '/posts/$slug', params: { slug: post.slug } })}
                          aria-label="수정"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>수정</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          disabled={deletePost.isPending && deletingSlug === post.slug}
                          onClick={() => handleDelete(post.slug, post.title)}
                          aria-label="삭제"
                        >
                          {deletePost.isPending && deletingSlug === post.slug ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>삭제</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
            이전
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {data.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)}>
            다음
          </Button>
        </div>
      )}
    </div>
  )
}
