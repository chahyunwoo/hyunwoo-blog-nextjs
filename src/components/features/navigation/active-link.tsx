'use client'

import type { LucideIcon } from 'lucide-react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActiveLinkProps {
  href: string
  title: string
  className?: string
  onClick?: () => void
  count?: number
  icon?: LucideIcon
  newBadge?: boolean
  isDropdown?: boolean
  isOpen?: boolean
  onToggleDropdown?: () => void
  isActive?: boolean
  prefetch?: boolean
}

export default memo(function ActiveLink({
  href,
  title,
  className,
  onClick,
  count,
  icon: Icon,
  newBadge = false,
  isDropdown = false,
  isOpen = false,
  onToggleDropdown,
  isActive: isActiveProp,
  prefetch = true,
}: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive =
    isActiveProp !== undefined
      ? isActiveProp
      : pathname === href ||
        (href === '/' && pathname.startsWith('/blog/')) ||
        (href !== '/' && pathname.startsWith(href))

  const handleToggleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (onToggleDropdown) {
        onToggleDropdown()
      }
    },
    [onToggleDropdown],
  )

  return (
    <Link href={href} prefetch={prefetch}>
      <Button
        onClick={onClick}
        variant="ghost"
        className={cn(
          'relative p-0 cursor-pointer w-full justify-between text-sm text-muted-foreground hover:text-foreground transition-colors',
          isActive && 'text-primary',
          isActive && Icon && 'bg-primary/5',
          className,
        )}
      >
        {isActive && Icon && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full" />
        )}
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />}
          {title}
          {newBadge && (
            <Badge variant="outline" className="text-[10px] h-4 px-1 text-red-500 border-none">
              New
            </Badge>
          )}
        </div>
        {count && (
          <div className="flex items-center gap-1">
            <span className={cn('text-xs', isActive ? 'text-primary/70' : 'text-muted-foreground')}>{count}</span>
            {isDropdown && onToggleDropdown && (
              <div onClick={handleToggleClick} className="focus:outline-none cursor-pointer ml-2">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            )}
          </div>
        )}
      </Button>
    </Link>
  )
})
