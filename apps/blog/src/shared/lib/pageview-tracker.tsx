'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { trackPageview } from './pageview'

export function PageviewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    trackPageview(pathname)
  }, [pathname])

  return null
}
