import { useEffect, useState } from 'react'

export function useScrollVisibility(getThreshold: () => number): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > getThreshold())
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [getThreshold])

  return isVisible
}
