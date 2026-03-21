import { Github, Instagram, Laptop, Linkedin, Moon, Sun } from 'lucide-react'
import type { MenuItem } from '@hyunwoo/shared/types'

export const MENU_ITEMS: MenuItem[] = [
  { name: 'Blog', href: '/' },
  { name: 'About', href: '/about/ko' },
]

export const THEME_TYPES = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'system', icon: Laptop },
]

export const SOCIAL_ICON_MAP: Record<string, React.ElementType> = {
  Github,
  Instagram,
  Linkedin,
}
