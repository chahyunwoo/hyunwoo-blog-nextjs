'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { useState } from 'react'
import { PDF_LOCALES } from '@/shared/config'

interface PdfBannerProps {
  visible: boolean
  onDismiss: () => void
}

export function PdfBanner({ visible, onDismiss }: PdfBannerProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingLocale, setGeneratingLocale] = useState<string | null>(null)

  const handleDownload = async (locale: string) => {
    setIsGenerating(true)
    setGeneratingLocale(locale)
    try {
      const { generateResumePdf } = await import('./resume-pdf')
      await generateResumePdf(locale)
    } finally {
      setIsGenerating(false)
      setGeneratingLocale(null)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed top-0 left-0 right-0 z-60 bg-primary/90 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-3 px-4 py-2.5 text-sm">
            <span className="text-primary-foreground font-medium">Download Portfolio PDF</span>
            <div className="flex gap-1.5">
              {PDF_LOCALES.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleDownload(l.code)}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-primary-foreground hover:bg-white/30 transition-colors text-xs font-medium disabled:opacity-50 cursor-pointer"
                >
                  <Download className="size-3" />
                  {generatingLocale === l.code ? '...' : l.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss PDF banner"
              className="absolute right-4 p-1 text-primary-foreground/80 hover:text-primary-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
