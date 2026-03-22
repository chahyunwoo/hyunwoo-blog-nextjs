import type { LucideIcon } from 'lucide-react'
import * as icons from 'lucide-react'

export function getIcon(name: string, fallback: LucideIcon = icons.Folder): LucideIcon {
  return (icons as Record<string, LucideIcon | undefined>)[name] ?? fallback
}
