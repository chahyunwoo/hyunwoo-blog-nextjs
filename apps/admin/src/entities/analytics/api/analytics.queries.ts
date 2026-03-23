import { useSuspenseQuery } from '@tanstack/react-query'
import {
  adminLogsOptions,
  dashboardOptions,
  popularPostsOptions,
  referrersOptions,
  systemOptions,
  visitorsOptions,
} from './analytics.options'

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
  return useSuspenseQuery(adminLogsOptions(limit))
}
