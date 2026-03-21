import { Center, Loader } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { postDetailOptions } from '@/entities/post'
import { PostEditPage } from '@/pages/posts'

export const Route = createFileRoute('/posts/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) => queryClient.ensureQueryData(postDetailOptions(slug)),
  pendingComponent: () => (
    <Center mih={400}>
      <Loader />
    </Center>
  ),
  component: PostEditRouteComponent,
})

function PostEditRouteComponent() {
  const { slug } = Route.useParams()
  return <PostEditPage slug={slug} />
}
