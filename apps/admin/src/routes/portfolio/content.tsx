import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/pages/portfolio'

export const Route = createFileRoute('/portfolio/content')({
  component: ContentPage,
})
