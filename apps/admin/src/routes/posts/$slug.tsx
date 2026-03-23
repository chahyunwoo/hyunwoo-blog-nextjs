import { createFileRoute } from '@tanstack/react-router'
import { postDetailOptions } from '@/entities/post'
import { PostEditPage } from '@/pages/posts'
import { PendingLoader } from '@/shared/ui'

export const Route = createFileRoute('/posts/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) => queryClient.ensureQueryData(postDetailOptions(slug)),
  pendingComponent: PendingLoader,
  component: PostEditRouteComponent,
})

function PostEditRouteComponent() {
  const { slug } = Route.useParams()
  return <PostEditPage slug={slug} />
}
