'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Lock, X } from 'lucide-react'
import { useState } from 'react'
import type { Work } from '@/entities/portfolio'

interface WorkDetailPanelProps {
  work: Work
  renderedContent?: React.ReactNode
  onClose: () => void
}

export function WorkDetailPanel({ work, renderedContent, onClose }: WorkDetailPanelProps) {
  const [privateNotice, setPrivateNotice] = useState<string | null>(null)

  const handlePrivateClick = (type: string) => {
    setPrivateNotice(`${type} is not available for this private project.`)
    setTimeout(() => setPrivateNotice(null), 2500)
  }

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="h-full overflow-y-auto bg-card border-l border-border"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b border-border">
        <h2 className="text-lg font-bold text-foreground">{work.title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {work.demoUrl ? (
            <a
              href={work.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="size-3.5" />
              Demo
            </a>
          ) : (
            <button
              type="button"
              onClick={() => handlePrivateClick('Demo')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white/5 text-muted-foreground cursor-pointer hover:bg-white/10 transition-colors"
            >
              <Lock className="size-3.5" />
              Demo
            </button>
          )}

          {work.repoUrl ? (
            <a
              href={work.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white/10 text-foreground hover:bg-white/15 transition-colors"
            >
              <Github className="size-3.5" />
              Repository
            </a>
          ) : (
            <button
              type="button"
              onClick={() => handlePrivateClick('Repository')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white/5 text-muted-foreground cursor-pointer hover:bg-white/10 transition-colors"
            >
              <Lock className="size-3.5" />
              Repository
            </button>
          )}
        </div>

        {privateNotice && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground flex items-center gap-1.5"
          >
            <Lock className="size-3" />
            {privateNotice}
          </motion.p>
        )}

        {renderedContent && <div>{renderedContent}</div>}
      </div>
    </motion.div>
  )
}
