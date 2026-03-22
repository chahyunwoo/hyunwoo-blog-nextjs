'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Monitor, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const DISMISSED_KEY = 'portfolio-resolution-notice-dismissed'

export function ResolutionNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(DISMISSED_KEY, 'true')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 2 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/90 backdrop-blur-sm shadow-xl shadow-primary/30 border border-primary/50"
        >
          <Monitor className="size-4 text-white shrink-0" />
          <span className="text-sm text-white font-medium whitespace-nowrap">
            This page is optimized for desktop browsers (1920 x 1080+)
          </span>
          <button
            type="button"
            onClick={dismiss}
            className="p-0.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer shrink-0"
          >
            <X className="size-3.5 text-white/80" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
