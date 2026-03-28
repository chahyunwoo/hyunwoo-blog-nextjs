'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { startTransition, useEffect, useRef, useState } from 'react'
import { useLoadingStore } from '@/shared/store'

const MIN_DISPLAY = 1800
const PROGRESS_UPDATE_INTERVAL = 100

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const setLoaded = useLoadingStore(s => s.setLoaded)
  const progressRef = useRef<HTMLParagraphElement>(null)
  const loaded = useRef(false)
  const timerPassed = useRef(false)

  useEffect(() => {
    const tryFinish = () => {
      if (loaded.current && timerPassed.current) setDone(true)
    }

    const onLoad = () => {
      loaded.current = true
      tryFinish()
    }

    if (document.readyState === 'complete') {
      loaded.current = true
    } else {
      window.addEventListener('load', onLoad)
    }

    const start = performance.now()
    let rafId: number
    let lastUpdate = 0
    const tick = () => {
      const elapsed = performance.now() - start
      if (elapsed - lastUpdate >= PROGRESS_UPDATE_INTERVAL) {
        lastUpdate = elapsed
        const pct = Math.min(Math.round((elapsed / MIN_DISPLAY) * 100), 100)
        if (progressRef.current) {
          progressRef.current.textContent = `${pct}%`
        }
      }
      if (elapsed < MIN_DISPLAY) {
        rafId = requestAnimationFrame(tick)
      } else {
        if (progressRef.current) {
          progressRef.current.textContent = '100%'
        }
        timerPassed.current = true
        tryFinish()
      }
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (window.innerWidth < 768) {
          document.body.style.position = 'fixed'
          document.body.style.top = '0'
          document.body.style.left = '0'
          document.body.style.right = '0'
          document.body.style.overflow = 'hidden'
        }
        startTransition(setLoaded)
        if (window.innerWidth >= 768) {
          useLoadingStore.getState().setIntroComplete()
        }
      }}
    >
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6"
        >
          <div className="text-shimmer-loading text-4xl font-bold">Portfolio</div>
          <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: MIN_DISPLAY / 1000, ease: 'easeInOut' }}
            />
          </div>
          <p ref={progressRef} className="text-xs text-muted-foreground tabular-nums">
            0%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
