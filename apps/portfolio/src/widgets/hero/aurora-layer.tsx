'use client'

import { useEffect, useRef } from 'react'
import { useLoadingStore } from '@/shared/store'

export function AuroraLayer() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      scrollRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.5))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const unsub = useLoadingStore.subscribe(s => {
      if (!s.isLoaded) return
      if (blob1Ref.current) blob1Ref.current.style.opacity = '1'
      setTimeout(() => {
        if (blob2Ref.current) blob2Ref.current.style.opacity = '1'
      }, 600)
      setTimeout(() => {
        if (blob3Ref.current) blob3Ref.current.style.opacity = '1'
      }, 1200)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      unsub()
    }
  }, [])

  return (
    <div ref={scrollRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        ref={blob1Ref}
        className="aurora-blob aurora-blob-1"
        style={{ opacity: 0, transition: 'opacity 1.2s ease' }}
      />
      <div
        ref={blob2Ref}
        className="aurora-blob aurora-blob-2"
        style={{ opacity: 0, transition: 'opacity 1.2s ease' }}
      />
      <div
        ref={blob3Ref}
        className="aurora-blob aurora-blob-3"
        style={{ opacity: 0, transition: 'opacity 1.2s ease' }}
      />
    </div>
  )
}
