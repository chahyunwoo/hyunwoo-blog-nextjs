import type { LucideProps } from 'lucide-react'
import { icons } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconProps {
  name: keyof typeof icons
  size?: number
  className?: string
  color?: string
}

export function Icon({ name, size = 24, color, className }: IconProps) {
  const LucideIcon = icons[name] as React.ComponentType<LucideProps>

  if (!LucideIcon) {
    return null
  }

  return <LucideIcon size={size} className={cn('inline-block align-middle', color, className)} />
}
