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
    profile: (locale: string) => ['portfolio', 'profile', locale] as const,
    experiences: (locale: string) => ['portfolio', 'experiences', locale] as const,
    projects: (locale: string) => ['portfolio', 'projects', locale] as const,
    skills: ['portfolio', 'skills'] as const,
    education: (locale: string) => ['portfolio', 'education', locale] as const,
    locales: ['portfolio', 'locales'] as const,
  },
} as const
