import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/shared/api'
import { queryKeys } from '@/shared/config'

interface DashboardData {
  postStats: { total: number; published: number; draft: number }
  categoryStats: { category: string; count: number }[]
  recentPosts: { slug: string; title: string; category: string; viewCount: number; createdAt: string }[]
  recentlyUpdated: { slug: string; title: string; updatedAt: string }[]
}

interface VisitorData {
  totalViews: number
  uniqueVisitors: number
  daily: { date: string; count: number }[]
}

interface PopularPost {
  slug: string
  title: string
  category: string
  viewCount: number
  createdAt: string
}

interface Referrer {
  referrer: string
  count: number
}

interface PopularPage {
  path: string
  count: number
}

interface SystemInfo {
  uptime: number
  uptimeFormatted: string
  database: string
  memory: { heapUsed: number; heapTotal: number; rss: number }
}

interface AdminLog {
  id: number
  action: string
  entity: string
  entityId: string
  detail: string
  username: string
  ipAddress: string
  createdAt: string
}

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard,
    queryFn: () => adminApi.get('api/analytics/dashboard').json<DashboardData>(),
  })
}

export function useVisitors(days = 30, app = 'blog') {
  return useQuery({
    queryKey: queryKeys.analytics.visitors(days, app),
    queryFn: () => adminApi.get(`api/analytics/visitors?days=${days}&app=${app}`).json<VisitorData>(),
  })
}

export function usePopularPosts(limit = 10) {
  return useQuery({
    queryKey: queryKeys.analytics.popularPosts(limit),
    queryFn: () => adminApi.get(`api/analytics/popular-posts?limit=${limit}`).json<PopularPost[]>(),
  })
}

export function useReferrers(days = 30, app = 'blog') {
  return useQuery({
    queryKey: queryKeys.analytics.referrers(days, app),
    queryFn: () => adminApi.get(`api/analytics/referrers?days=${days}&app=${app}`).json<Referrer[]>(),
  })
}

export function usePopularPages(days = 30, app = 'blog', limit = 20) {
  return useQuery({
    queryKey: queryKeys.analytics.popularPages(days, app, limit),
    queryFn: () =>
      adminApi.get(`api/analytics/popular-pages?days=${days}&app=${app}&limit=${limit}`).json<PopularPage[]>(),
  })
}

export function useSystemInfo() {
  return useQuery({
    queryKey: queryKeys.analytics.system,
    queryFn: () => adminApi.get('api/analytics/system').json<SystemInfo>(),
    refetchInterval: 30_000,
  })
}

export function useAdminLogs(limit = 20) {
  return useQuery({
    queryKey: queryKeys.analytics.adminLogs(limit),
    queryFn: () => adminApi.get(`api/analytics/admin-logs?limit=${limit}`).json<AdminLog[]>(),
  })
}

export type { AdminLog, DashboardData, PopularPage, PopularPost, Referrer, SystemInfo, VisitorData }
