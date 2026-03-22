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

export interface Referrer {
  referrer: string
  count: number
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
