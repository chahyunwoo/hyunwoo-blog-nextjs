import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { postListOptions } from '@/entities/post'
import { PostListPage } from '@/pages/posts'

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postListOptions({ page: 1, limit: 20 })),
  pendingComponent: PendingLoader,
  component: PostListPage,
})

function PendingLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-6 animate-spin" />
    </div>
  )
}
