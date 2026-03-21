import { createFileRoute } from '@tanstack/react-router'
import { PostNewPage } from '@/pages/posts'

export const Route = createFileRoute('/posts/new')({
  component: PostNewPage,
})
