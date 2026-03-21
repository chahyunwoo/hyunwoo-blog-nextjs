export const BASE_URL = 'https://chahyunwoo.dev'

export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30' viewBox='0 0 40 30'%3E%3Crect width='40' height='30' fill='%23f1f5f9'/%3E%3C/svg%3E"

export const REVALIDATE_TYPES = {
  BLOG: 'blog',
  PORTFOLIO: 'portfolio',
} as const

export const CACHE_TAGS = {
  BLOG_POSTS: 'blog-posts',
  BLOG_POST: (slug: string) => `blog-post-${slug}`,
  BLOG_CATEGORIES: 'blog-categories',
  BLOG_TAGS: 'blog-tags',
  PORTFOLIO_PROFILE: 'portfolio-profile',
  PORTFOLIO_EXPERIENCES: 'portfolio-experiences',
  PORTFOLIO_PROJECTS: 'portfolio-projects',
  PORTFOLIO_SKILLS: 'portfolio-skills',
  PORTFOLIO_EDUCATION: 'portfolio-education',
  PORTFOLIO_LOCALES: 'portfolio-locales',
} as const

export const ABOUT_PATHS = ['/about/ko', '/about/en', '/about/jp'] as const

export const LINK_TYPES = {
  ALL: 'all',
  CATEGORY: 'category',
  TAG: 'tag',
  DEFAULT: 'default',
} as const
