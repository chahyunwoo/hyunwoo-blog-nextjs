import { createFileRoute } from '@tanstack/react-router'
import { WorkFormPage } from '@/pages/portfolio'

export const Route = createFileRoute('/portfolio/works/new')({
  component: WorkNewRouteComponent,
})

function WorkNewRouteComponent() {
  return <WorkFormPage mode="create" />
}
