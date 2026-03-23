import { cn } from '@hyunwoo/shared/lib'
import { Link, useMatchRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface NavItemProps {
  to: string
  label: string
  icon: ReactNode
}

export function NavItem({ to, label, icon }: NavItemProps) {
  const matchRoute = useMatchRoute()
  const isActive = !!matchRoute({ to, fuzzy: to !== '/' })

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
    >
      {icon}
      {label}
    </Link>
  )
}
