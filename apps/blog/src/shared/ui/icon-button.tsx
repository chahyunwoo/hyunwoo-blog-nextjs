import { cn } from '@hyunwoo/shared/lib'
import { Button, type buttonVariants } from '@hyunwoo/ui'
import type { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type * as React from 'react'

function IconButton({
  className,
  variant = 'ghost',
  size = 'icon',
  icon: Icon,
  href,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon: React.ElementType
    href?: string
  }) {
  return (
    <Button variant={variant} size={size} className={cn('min-w-[44px] min-h-[44px]', className)} {...props}>
      {href ? (
        <Link href={href} target="_blank" aria-label={props['aria-label']}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  )
}

export { IconButton }
