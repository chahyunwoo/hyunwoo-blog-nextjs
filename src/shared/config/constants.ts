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
