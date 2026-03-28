'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Globe, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { Work, WorkType } from '@/entities/portfolio'
import { WORKS_LOCALES } from '@/shared/config'
import { SectionHeader } from '@/shared/ui'
import { WorkDetailPanel } from './work-detail-panel'
import { WorksCarousel } from './works-carousel'

type TabValue = 'all' | WorkType

const TABS: { label: string; value: TabValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Business', value: 'business' },
  { label: 'Personal', value: 'personal' },
]

interface WorksSectionProps {
  allWorks: Record<string, Work[]>
  renderedContents: Record<string, Record<number, React.ReactNode>>
}

export function WorksSection({ allWorks, renderedContents }: WorksSectionProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [locale, setLocale] = useState('ko')

  const works = allWorks[locale] ?? []
  const filteredWorks = activeTab === 'all' ? works : works.filter(w => w.type === activeTab)
  const currentContents = renderedContents[locale] ?? {}

  const isOpen = selectedId !== null
  const selectedInFilter = filteredWorks.find(w => w.id === selectedId)
  const selectedWork = isOpen ? (selectedInFilter ?? filteredWorks[0] ?? null) : null

  useEffect(() => {
    if (isOpen && selectedWork && selectedWork.id !== selectedId) {
      setSelectedId(selectedWork.id)
    }
  }, [isOpen, selectedWork, selectedId])

  const handleSelect = useCallback((id: number) => {
    setSelectedId(prev => (prev === id ? null : id))
  }, [])

  const handleClose = useCallback(() => {
    setSelectedId(null)
  }, [])

  return (
    <section id="works" className="section-padding">
      <SectionHeader title="Works" description="Business and personal projects I've worked on" />

      <div className="flex items-center gap-4 mb-8 flex-wrap gap-y-3">
        <div className="flex gap-2">
          {TABS.map(tab => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`
                px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full transition-all cursor-pointer
                ${
                  activeTab === tab.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Globe className="size-3.5 text-muted-foreground" />
          {WORKS_LOCALES.map(l => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLocale(l.code)}
              className={`
                px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer
                ${
                  locale === l.code
                    ? 'bg-white/15 text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }
              `}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 데스크톱: 캐러셀 + 사이드 패널 */}
      <div className="hidden md:flex gap-6 items-start">
        <div
          className={`${selectedWork ? 'w-[35%] shrink-0' : 'w-full'} transition-[width] duration-500 ease-out overflow-hidden`}
        >
          <WorksCarousel
            works={filteredWorks}
            selectedId={selectedId}
            compact={selectedWork !== null}
            onSelect={handleSelect}
            onActiveChange={selectedId !== null ? id => setSelectedId(id) : undefined}
          />
        </div>

        <AnimatePresence>
          {selectedWork && (
            <motion.div
              key="detail-panel"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="flex-1 min-w-0 h-[75vh] rounded-xl overflow-hidden border border-border"
            >
              <WorkDetailPanel
                work={selectedWork}
                renderedContent={currentContents[selectedWork.id]}
                onClose={handleClose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 모바일: 캐러셀 + bottom sheet */}
      <div className="md:hidden">
        <WorksCarousel
          works={filteredWorks}
          selectedId={selectedId}
          compact={false}
          onSelect={handleSelect}
          onActiveChange={selectedId !== null ? id => setSelectedId(id) : undefined}
        />

        <AnimatePresence>
          {selectedWork && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-55 backdrop-blur-sm"
                onClick={handleClose}
              />
              <motion.div
                key="bottom-sheet"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-60 bg-card rounded-t-2xl border-t border-border max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                  <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                  <h2 className="text-base font-bold text-foreground pt-2">{selectedWork.title}</h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="overflow-y-auto flex-1">
                  <WorkDetailPanel
                    work={selectedWork}
                    renderedContent={currentContents[selectedWork.id]}
                    onClose={handleClose}
                    hideHeader
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
