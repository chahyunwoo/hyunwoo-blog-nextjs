import { createFileRoute } from '@tanstack/react-router'
import {
  adminLogsOptions,
  dashboardOptions,
  popularPostsOptions,
  referrersOptions,
  systemOptions,
  visitorsOptions,
} from '@/entities/analytics'
import { DashboardPage } from '@/pages/dashboard'
import { PendingLoader } from '@/shared/ui'

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
