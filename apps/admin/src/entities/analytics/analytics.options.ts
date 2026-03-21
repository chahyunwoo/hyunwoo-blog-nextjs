import { queryOptions } from '@tanstack/react-query'
import { adminApi } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import type { DashboardData, PopularPost, Referrer, SystemInfo, VisitorData } from './analytics.queries'

export function dashboardOptions() {
  return queryOptions({
    queryKey: queryKeys.analytics.dashboard,
    queryFn: () => adminApi.get('api/analytics/dashboard').json<DashboardData>(),
  })
}

export function visitorsOptions(days?: number, app = 'blog') {
  const params = new URLSearchParams({ app })
  if (days !== undefined) params.set('days', String(days))

  return queryOptions({
    queryKey: days !== undefined ? queryKeys.analytics.visitors(days, app) : queryKeys.analytics.visitorsTotal,
    queryFn: () => adminApi.get(`api/analytics/visitors?${params}`).json<VisitorData>(),
  })
}

export function popularPostsOptions(limit = 10) {
  return queryOptions({
    queryKey: queryKeys.analytics.popularPosts(limit),
    queryFn: () => adminApi.get(`api/analytics/popular-posts?limit=${limit}`).json<PopularPost[]>(),
  })
}

export function referrersOptions(days = 30, app = 'blog') {
  return queryOptions({
    queryKey: queryKeys.analytics.referrers(days, app),
    queryFn: () => adminApi.get(`api/analytics/referrers?days=${days}&app=${app}`).json<Referrer[]>(),
  })
}

export function systemOptions() {
  return queryOptions({
    queryKey: queryKeys.analytics.system,
    queryFn: () => adminApi.get('api/analytics/system').json<SystemInfo>(),
  })
}
