import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/new')({
  component: () => <div>New Post (WIP)</div>,
})
