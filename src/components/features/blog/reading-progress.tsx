'use client'

import { useEffect, useRef } from 'react'

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (barRef.current) {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            barRef.current.style.width = `${progress}%`
            barRef.current.parentElement?.style.setProperty('opacity', progress > 0 ? '1' : '0')
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-14 left-0 right-0 z-10 h-px opacity-0 transition-opacity duration-300">
      <div ref={barRef} className="h-full bg-primary/50" style={{ width: '0%' }} />
    </div>
  )
}
