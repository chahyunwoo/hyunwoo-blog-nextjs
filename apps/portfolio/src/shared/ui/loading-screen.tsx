'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const MIN_DISPLAY = 1800

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
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
    const tick = () => {
      const elapsed = performance.now() - start
      setProgress(Math.min(Math.round((elapsed / MIN_DISPLAY) * 100), 100))
      if (elapsed < MIN_DISPLAY) {
        requestAnimationFrame(tick)
      } else {
        timerPassed.current = true
        tryFinish()
      }
    }
    requestAnimationFrame(tick)

    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6"
        >
          <div className="text-shimmer text-4xl font-bold">Portfolio</div>
          <div className="w-48 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: MIN_DISPLAY / 1000, ease: 'easeInOut' }}
            />
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
