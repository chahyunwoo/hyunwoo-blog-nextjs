'use client'

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
          'p-0 cursor-pointer w-full justify-between text-sm text-muted-foreground hover:text-foreground transition-colors',
          isActive && 'text-primary',
          className,
        )}
      >
        <div className="flex items-center gap-2">
          {title}
          {newBadge && (
            <Badge variant="outline" className="text-[10px] h-4 px-1 text-red-500 border-none">
              New
            </Badge>
          )}
        </div>
        {count && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{count}</span>
            {isDropdown && onToggleDropdown && (
              <button
                type="button"
                onClick={handleToggleClick}
                className="focus:outline-none cursor-pointer ml-2"
                aria-label="toggle dropdown"
              >
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}
      </Button>
    </Link>
  )
})
