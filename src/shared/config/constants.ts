import { Github, Instagram, Laptop, Linkedin, Moon, Sun } from 'lucide-react'
import type { MenuItem } from '@/shared/types'

// SITE
export const BASE_URL = 'https://chahyunwoo.dev'

// HEADER
export const MENU_ITEMS: MenuItem[] = [
  { name: 'Blog', href: '/' },
  { name: 'About', href: '/about/ko' },
]

export const THEME_TYPES = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'system', icon: Laptop },
]

// SOCIAL ICON
export const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  Github,
  Instagram,
  Linkedin,
}

// IMAGE
export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30' viewBox='0 0 40 30'%3E%3Crect width='40' height='30' fill='%23f1f5f9'/%3E%3C/svg%3E"

// NAVIGATION
export const LINK_TYPES = {
  ALL: 'all',
  CATEGORY: 'category',
  TAG: 'tag',
  DEFAULT: 'default',
} as const

// REVALIDATION
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
