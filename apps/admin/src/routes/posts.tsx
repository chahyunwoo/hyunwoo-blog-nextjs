import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: PostsPage,
})

function PostsPage() {
  return <Title order={2}>Posts</Title>
}
