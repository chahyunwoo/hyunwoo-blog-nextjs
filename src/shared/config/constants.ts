import { Laptop, Moon, Sun } from 'lucide-react'
import type { Locale, MenuItem } from '@/shared/types'

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
