'use client'

import { useEffect, useRef } from 'react'
import { useLoadingStore } from '@/shared/store'

export function ScrollBackground({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntroComplete = useLoadingStore(s => s.isIntroComplete)

  useEffect(() => {
    if (isIntroComplete) {
      document.documentElement.classList.remove('scroll-locked')
    }
  }, [isIntroComplete])

  useEffect(() => {
    let raf: number
    let ticking = false

    const update = () => {
      if (!ref.current) return
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.min(scrollY / Math.max(docHeight, 1), 1)

      const topR = Math.round(6 + p * 18)
      const topG = Math.round(6 + p * 12)
      const topB = Math.round(20 + p * 25)

      const botR = Math.round(6 + p * 80)
      const botG = Math.round(6 + p * 45)
      const botB = Math.round(20 + p * 40)

      if (window.innerWidth >= 768) {
        ref.current.style.background = `linear-gradient(180deg, rgb(${topR},${topG},${topB}) 0%, rgb(${botR},${botG},${botB}) 100%)`
      } else {
        document.documentElement.style.background = `linear-gradient(180deg, rgb(${topR},${topG},${topB}) 0%, rgb(${botR},${botG},${botB}) 100%)`
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="min-h-screen">
      {children}
    </div>
  )
}
