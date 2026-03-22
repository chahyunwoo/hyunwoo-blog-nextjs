import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import {
  adminLogsOptions,
  dashboardOptions,
  popularPostsOptions,
  referrersOptions,
  systemOptions,
  visitorsOptions,
} from '@/entities/analytics'
import { DashboardPage } from '@/pages/dashboard'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(dashboardOptions()),
      queryClient.ensureQueryData(visitorsOptions(30, 'blog')),
      queryClient.ensureQueryData(visitorsOptions(1, 'blog')),
      queryClient.ensureQueryData(visitorsOptions(undefined, 'blog')),
      queryClient.ensureQueryData(popularPostsOptions(5)),
      queryClient.ensureQueryData(referrersOptions(30, 'blog')),
      queryClient.ensureQueryData(systemOptions()),
      queryClient.ensureQueryData(adminLogsOptions(5)),
    ]),
  pendingComponent: PendingLoader,
  component: DashboardPage,
})

function PendingLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="size-6 animate-spin" />
    </div>
  )
}
