export interface DashboardData {
  postStats: { total: number; published: number; draft: number }
  categoryStats: { category: string; count: number }[]
  recentPosts: { slug: string; title: string; category: string; viewCount: number; createdAt: string }[]
  recentlyUpdated: { slug: string; title: string; updatedAt: string }[]
}

export interface VisitorData {
  totalViews: number
  uniqueVisitors: number
  daily: { date: string; count: number }[]
}

export interface PopularPost {
  slug: string
  title: string
  category: string
  viewCount: number
  createdAt: string
}

export type ReferrerCategory = 'direct' | 'search' | 'social' | 'other'

export interface ReferrerItem {
  source: string
  category: ReferrerCategory
  count: number
  percentage: number
}

export interface ReferrerSummary {
  total: number
  direct: number
  search: number
  social: number
  other: number
}

export interface ReferrerData {
  summary: ReferrerSummary
  referrers: ReferrerItem[]
}

export interface VisitorVisit {
  path: string
  referrer: string | null
  visitedAt: string
}

export interface VisitorTimelineItem {
  ipAddress: string
  city: string
  country: string
  isBot: boolean
  totalViews: number
  visits: VisitorVisit[]
}

export interface SystemInfo {
  uptime: number
  uptimeFormatted: string
  database: string
  memory: { heapUsed: number; heapTotal: number; rss: number }
}

export interface AdminLog {
  id: number
  action: string
  entity: string
  entityId: string
  detail: string
  username: string
  ipAddress: string
  createdAt: string
}
