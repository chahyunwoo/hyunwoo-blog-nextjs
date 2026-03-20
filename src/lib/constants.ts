import path from 'node:path'
import { Laptop, Moon, Sun } from 'lucide-react'
import type { Locale, MenuItem } from '@/types'

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

// POSTS
export const POSTS_PATH = path.join(process.cwd(), 'src', 'posts')
export const RECENT_DAYS = 5

// ABOUT
export const LANGUAGE_MAP: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  jp: '日本語',
}

// NAVIGATION
export const LINK_TYPES = {
  ALL: 'all',
  CATEGORY: 'category',
  TAG: 'tag',
  DEFAULT: 'default',
} as const
