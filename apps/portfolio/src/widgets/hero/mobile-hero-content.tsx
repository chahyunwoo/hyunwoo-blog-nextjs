'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLoadingStore } from '@/shared/store'
import { HERO_TITLE, MOBILE_INTRO_DELAYS, WORKS_SECTION_ID } from './constants'

interface MobileHeroContentProps {
  name: string
  jobTitle: string
}

export function MobileHeroContent({ name, jobTitle }: MobileHeroContentProps) {
  const jobTitleRef = useRef<HTMLParagraphElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const unsub = useLoadingStore.subscribe(s => {
      if (!s.isLoaded) return
      // Chrome 첫 프레임 paint 버그 workaround: 최소 100ms delay 필요
      setTimeout(() => {
        if (jobTitleRef.current) jobTitleRef.current.style.opacity = '1'
      }, MOBILE_INTRO_DELAYS.jobTitle)
      setTimeout(() => {
        if (h1Ref.current) h1Ref.current.style.opacity = '1'
      }, MOBILE_INTRO_DELAYS.h1)
      setTimeout(() => {
        if (nameRef.current) nameRef.current.style.opacity = '1'
      }, MOBILE_INTRO_DELAYS.name)
      setTimeout(() => {
        if (!btnRef.current) return
        const btn = btnRef.current
        const done = () => useLoadingStore.getState().setIntroComplete()
        btn.addEventListener('transitionend', done, { once: true })
        btn.style.opacity = '1'
        // transitionend가 발생하지 않는 경우 fallback
        setTimeout(done, MOBILE_INTRO_DELAYS.transitionFallback)
      }, MOBILE_INTRO_DELAYS.btn)
    })
    return () => unsub()
  }, [])

  return (
    <div className="relative z-10 md:hidden flex flex-col items-center justify-center text-center px-6 min-h-screen pointer-events-none">
      <p
        ref={jobTitleRef}
        style={{
          opacity: 0,
          transition: 'opacity 0.5s ease',
          filter: 'drop-shadow(0 2px 4px rgba(108,60,224,0.5))',
        }}
        className="text-xs tracking-[0.25em] uppercase text-shimmer mb-3 font-semibold"
      >
        {jobTitle}
      </p>

      <h1
        ref={h1Ref}
        style={{
          opacity: 0,
          transition: 'opacity 0.7s ease',
          filter: 'drop-shadow(0 4px 16px rgba(108,60,224,0.4))',
        }}
        className="text-5xl font-bold"
      >
        {HERO_TITLE}
      </h1>

      <p
        ref={nameRef}
        style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
        className="mt-3 text-shimmer text-base font-semibold"
      >
        {name}
      </p>

      <button
        ref={btnRef}
        type="button"
        style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
        onClick={() => {
          document.getElementById(WORKS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="mt-8 flex flex-col items-center gap-1.5 text-white/40 cursor-pointer pointer-events-auto"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-4" />
        </motion.div>
      </button>
    </div>
  )
}
