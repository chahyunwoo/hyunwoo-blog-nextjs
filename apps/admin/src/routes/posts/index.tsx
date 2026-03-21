import { Center, Loader } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { postListOptions } from '@/entities/post'
import { PostListPage } from '@/pages/posts'

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postListOptions({ page: 1, limit: 20 })),
  pendingComponent: () => (
    <Center mih={400}>
      <Loader />
    </Center>
  ),
  component: PostListPage,
})
