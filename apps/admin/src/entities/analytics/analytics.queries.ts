import { useSuspenseQuery } from '@tanstack/react-query'
import { adminApi } from '@/shared/api'
import { queryKeys } from '@/shared/config'
import {
  dashboardOptions,
  popularPostsOptions,
  referrersOptions,
  systemOptions,
  visitorsOptions,
} from './analytics.options'

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
  return useSuspenseQuery(dashboardOptions())
}

export function useVisitors(days?: number, app = 'blog') {
  return useSuspenseQuery(visitorsOptions(days, app))
}

export function usePopularPosts(limit = 10) {
  return useSuspenseQuery(popularPostsOptions(limit))
}

export function useReferrers(days = 30, app = 'blog') {
  return useSuspenseQuery(referrersOptions(days, app))
}

export function useSystemInfo() {
  return useSuspenseQuery(systemOptions())
}

export function useAdminLogs(limit = 20) {
  return useSuspenseQuery({
    queryKey: queryKeys.analytics.adminLogs(limit),
    queryFn: () => adminApi.get(`api/analytics/admin-logs?limit=${limit}`).json<AdminLog[]>(),
  })
}

export type { AdminLog, DashboardData, PopularPost, Referrer, SystemInfo, VisitorData }
