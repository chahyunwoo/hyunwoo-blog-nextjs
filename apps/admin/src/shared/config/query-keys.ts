export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    list: (params?: { page?: number; category?: string }) => ['posts', 'list', params] as const,
    detail: (slug: string) => ['posts', 'detail', slug] as const,
  },
  categories: {
    all: ['categories'] as const,
  },
  tags: {
    all: ['tags'] as const,
  },
  analytics: {
    dashboard: ['analytics', 'dashboard'] as const,
    visitors: (days?: number, app?: string) => ['analytics', 'visitors', days, app] as const,
    visitorsTotal: ['analytics', 'visitors', 'total'] as const,
    popularPosts: (limit: number) => ['analytics', 'popular-posts', limit] as const,
    referrers: (days: number, app: string) => ['analytics', 'referrers', days, app] as const,
    system: ['analytics', 'system'] as const,
    adminLogs: (limit: number) => ['analytics', 'admin-logs', limit] as const,
  },
} as const
