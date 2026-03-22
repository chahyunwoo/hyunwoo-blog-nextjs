import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { postDetailOptions } from '@/entities/post'
import { PostEditPage } from '@/pages/posts'

export const Route = createFileRoute('/posts/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) => queryClient.ensureQueryData(postDetailOptions(slug)),
  pendingComponent: PendingLoader,
  component: PostEditRouteComponent,
})

function PendingLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-6 animate-spin" />
    </div>
  )
}

function PostEditRouteComponent() {
  const { slug } = Route.useParams()
  return <PostEditPage slug={slug} />
}
