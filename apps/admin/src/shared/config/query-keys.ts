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
  portfolio: {
    works: {
      all: ['portfolio', 'works'] as const,
      list: (type?: string) => ['portfolio', 'works', 'list', type] as const,
      detail: (id: number) => ['portfolio', 'works', 'detail', id] as const,
    },
    experiences: {
      all: ['portfolio', 'experiences'] as const,
    },
    projects: {
      all: ['portfolio', 'projects'] as const,
    },
    skills: {
      all: ['portfolio', 'skills'] as const,
    },
    education: {
      all: ['portfolio', 'education'] as const,
    },
    profile: (locale?: string) => ['portfolio', 'profile', locale] as const,
    locales: ['portfolio', 'locales'] as const,
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
