import { createFileRoute } from '@tanstack/react-router'
import { WorksListPage } from '@/pages/portfolio'

export const Route = createFileRoute('/portfolio/works/')({
  component: WorksListPage,
})
