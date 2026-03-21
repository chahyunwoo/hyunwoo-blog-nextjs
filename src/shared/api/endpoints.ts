export const ENDPOINTS = {
  blog: {
    posts: '/api/blog/posts',
    postBySlug: (slug: string) => `/api/blog/posts/${slug}`,
    recentPosts: '/api/blog/posts/recent',
    search: '/api/blog/posts/search',
    relatedPosts: (slug: string) => `/api/blog/posts/${slug}/related`,
    categories: '/api/blog/categories',
    tags: '/api/blog/tags',
  },
  portfolio: {
    profile: '/api/portfolio/profile',
    experiences: '/api/portfolio/experiences',
    projects: '/api/portfolio/projects',
    skills: '/api/portfolio/skills',
    education: '/api/portfolio/education',
    locales: '/api/portfolio/locales',
  },
} as const
