import { Loader, Stack } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { PostListPage } from '@/pages/posts'

export const Route = createFileRoute('/posts/')({
  pendingComponent: () => (
    <Stack align="center" justify="center" mih={400}>
      <Loader />
    </Stack>
  ),
  component: PostListPage,
})
