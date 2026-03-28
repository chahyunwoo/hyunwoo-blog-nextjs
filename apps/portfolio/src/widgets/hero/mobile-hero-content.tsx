'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLoadingStore } from '@/shared/store'
import { HERO_TITLE, MOBILE_INTRO_DELAY_MS, WORKS_SECTION_ID } from './constants'

interface MobileHeroContentProps {
  name: string
  jobTitle: string
}

export function MobileHeroContent({ name, jobTitle }: MobileHeroContentProps) {
  const jobTitleWrapRef = useRef<HTMLDivElement>(null)
  const h1WrapRef = useRef<HTMLDivElement>(null)
  const nameWrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const unsub = useLoadingStore.subscribe(async s => {
      if (!s.isLoaded) return

      const show = (el: HTMLElement, ms: number) =>
        new Promise<void>(resolve => {
          let done = false
          const finish = () => {
            if (!done) {
              done = true
              resolve()
            }
          }
          el.addEventListener('transitionend', finish, { once: true })
          el.style.opacity = '1'
          setTimeout(finish, ms + 50)
        })

      await new Promise<void>(resolve => setTimeout(resolve, MOBILE_INTRO_DELAY_MS))
      if (jobTitleWrapRef.current) {
        jobTitleWrapRef.current.querySelector<HTMLElement>('[data-shimmer]')?.classList.add('text-shimmer')
        await show(jobTitleWrapRef.current, 500)
      }
      if (h1WrapRef.current) {
        h1WrapRef.current.querySelector<HTMLElement>('[data-shimmer]')?.classList.add('text-shimmer')
        await show(h1WrapRef.current, 700)
      }
      if (nameWrapRef.current) {
        nameWrapRef.current.querySelector<HTMLElement>('[data-shimmer]')?.classList.add('text-shimmer')
        await show(nameWrapRef.current, 500)
      }
      if (btnRef.current) {
        btnRef.current.style.opacity = '1'
      }
      document.documentElement.classList.remove('scroll-locked')
      useLoadingStore.getState().setIntroComplete()
    })
    return () => unsub()
  }, [])

  return (
    <div className="relative z-10 md:hidden flex flex-col items-center justify-center text-center px-6 min-h-svh pointer-events-none">
      <div ref={jobTitleWrapRef} style={{ opacity: 0, transition: 'opacity 0.5s ease' }}>
        <p
          data-shimmer
          style={{
            filter:
              'drop-shadow(0 3px 6px rgba(108,60,224,0.6)) drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 1px 0px rgba(255,255,255,0.12))',
          }}
          className="text-xs tracking-[0.25em] uppercase mb-3 font-semibold"
        >
          {jobTitle}
        </p>
      </div>

      <div ref={h1WrapRef} style={{ opacity: 0, transition: 'opacity 0.7s ease' }}>
        <h1
          data-shimmer
          style={{
            filter:
              'drop-shadow(0 3px 4px rgba(108,60,224,0.7)) drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 1px 0px rgba(255,255,255,0.15))',
          }}
          className="text-5xl font-bold"
        >
          {HERO_TITLE}
        </h1>
      </div>

      <div ref={nameWrapRef} style={{ opacity: 0, transition: 'opacity 0.5s ease' }}>
        <p
          data-shimmer
          style={{
            filter:
              'drop-shadow(0 3px 6px rgba(108,60,224,0.6)) drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 1px 0px rgba(255,255,255,0.12))',
          }}
          className="mt-3 text-base font-semibold"
        >
          {name}
        </p>
      </div>

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
