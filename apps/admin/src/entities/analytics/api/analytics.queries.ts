import { useSuspenseQuery } from '@tanstack/react-query'
import {
  adminLogsOptions,
  dashboardOptions,
  popularPostsOptions,
  referrersOptions,
  systemOptions,
  visitorsOptions,
  visitorsTimelineOptions,
} from './analytics.options'

export function useDashboard() {
  return useSuspenseQuery(dashboardOptions())
}

export function useVisitors(days?: number, app = 'blog') {
  return useSuspenseQuery(visitorsOptions(days, app))
}

export function usePopularPosts(limit = 10, days?: number) {
  return useSuspenseQuery(popularPostsOptions(limit, days))
}

export function useReferrers(days = 30, app = 'blog') {
  return useSuspenseQuery(referrersOptions(days, app))
}

export function useVisitorsTimeline(days = 7, app = 'blog') {
  return useSuspenseQuery(visitorsTimelineOptions(days, app))
}

export function useSystemInfo() {
  return useSuspenseQuery(systemOptions())
}

export function useAdminLogs(limit = 20) {
  return useSuspenseQuery(adminLogsOptions(limit))
}
