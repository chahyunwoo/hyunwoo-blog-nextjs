import { createFileRoute } from '@tanstack/react-router'
import { WorkFormPage } from '@/pages/portfolio'

export const Route = createFileRoute('/portfolio/works/$id')({
  component: WorkEditRouteComponent,
})

function WorkEditRouteComponent() {
  const { id } = Route.useParams()
  return <WorkFormPage mode="edit" id={Number(id)} />
}
