import { createFileRoute } from '@tanstack/react-router'
import { ManagePage } from '@/pages/portfolio'

export const Route = createFileRoute('/portfolio/manage')({
  component: ManagePage,
})
