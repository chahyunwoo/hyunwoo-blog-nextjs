import { createFileRoute } from '@tanstack/react-router'
import { postListOptions } from '@/entities/post'
import { PostListPage } from '@/pages/posts'
import { PendingLoader } from '@/shared/ui'

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postListOptions({ page: 1, limit: 20 })),
  pendingComponent: PendingLoader,
  component: PostListPage,
})
