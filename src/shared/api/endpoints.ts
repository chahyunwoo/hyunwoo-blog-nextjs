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
} as const
