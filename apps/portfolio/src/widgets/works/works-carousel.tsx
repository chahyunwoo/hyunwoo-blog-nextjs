'use client'

import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Lock, MousePointerClick } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { Work } from '@/entities/portfolio'

interface WorksCarouselProps {
  works: Work[]
  selectedId: number | null
  compact: boolean
  onSelect: (id: number) => void
  onActiveChange?: (id: number) => void
}

function getGradient(work: Work): string {
  const colors = work.gradientColors
  if (colors && colors.length >= 2) {
    return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
  }
  return 'linear-gradient(135deg, #6c3ce0, #a855f7)'
}

function formatPeriod(work: Work) {
  if (!work.startDate) return null
  const start = work.startDate.slice(0, 7)
  if (work.isCurrent) return `${start} ~ Present`
  if (work.endDate) return `${start} ~ ${work.endDate.slice(0, 7)}`
  return start
}

function wrapIndex(i: number, length: number) {
  return ((i % length) + length) % length
}

export function WorksCarousel({ works, selectedId, compact, onSelect, onActiveChange }: WorksCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const count = works.length
  const maxVisible = compact ? 1 : Math.min(Math.floor(count / 2), 4)
  const spacing = compact ? 240 : 320
  const arcRadius = compact ? 700 : 900

  useEffect(() => {
    if (selectedId !== null) {
      const idx = works.findIndex(w => w.id === selectedId)
      if (idx !== -1) {
        setActiveIndex(idx)
        return
      }
    }
    setActiveIndex(0)
  }, [works, selectedId])

  const goTo = useCallback(
    (index: number) => {
      const wrapped = wrapIndex(index, count)
      setActiveIndex(wrapped)
      const work = works[wrapped]
      if (work && onActiveChange) {
        onActiveChange(work.id)
      }
    },
    [count, works, onActiveChange],
  )

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const activeWork = works[activeIndex]

  const getOffset = (i: number) => {
    let diff = i - activeIndex
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
    return diff
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          className="relative flex items-center justify-center"
          style={{ height: '420px', perspective: '1200px', clipPath: 'inset(0)' }}
        >
          <div
            className="relative flex items-center justify-center w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {works.map((work, i) => {
              const offset = getOffset(i)
              const absOffset = Math.abs(offset)
              const inRange = absOffset <= maxVisible

              const isCenter = offset === 0
              const displayNumber = String(i + 1).padStart(2, '0')
              const saturation = work.featured ? 1 : 0.6

              const clampedOffset = inRange ? offset : Math.sign(offset) * (maxVisible + 1)
              const clampedAbs = Math.abs(clampedOffset)
              const angle = (clampedOffset * spacing) / arcRadius
              const x = Math.sin(angle) * arcRadius
              const z = (Math.cos(angle) - 1) * arcRadius
              const cardScale = isCenter ? 1 : Math.max(0.6, 1 - clampedAbs * 0.12)
              const rotateY = -angle * (180 / Math.PI) * 0.3
              const opacity = inRange ? (isCenter ? 1 : Math.max(0.4, 0.9 - clampedAbs * 0.2)) : 0
              const zIndex = inRange ? 100 - absOffset : 0

              return (
                <motion.div
                  key={work.id}
                  className={`
                    absolute rounded-2xl overflow-hidden cursor-pointer
                    ${compact ? 'w-[240px] h-[300px]' : 'w-[300px] h-[380px]'}
                    ${selectedId === work.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                  `}
                  style={{
                    filter: `saturate(${saturation})`,
                    zIndex,
                    transformStyle: 'preserve-3d',
                    pointerEvents: inRange ? 'auto' : 'none',
                    boxShadow: isCenter
                      ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(108,60,224,0.2)'
                      : '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                  animate={{
                    x,
                    z,
                    rotateY,
                    scale: cardScale,
                    opacity,
                    y: isCenter ? [0, -5, 0] : 0,
                  }}
                  transition={{
                    x: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    z: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    rotateY: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.3 },
                    y: isCenter ? { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' } : undefined,
                  }}
                  onClick={() => {
                    if (isCenter) onSelect(work.id)
                    else goTo(i)
                  }}
                >
                  <div className="h-2.5" style={{ background: getGradient(work) }} />

                  <div className={`bg-card h-full ${compact ? 'p-3' : 'p-5'} flex flex-col`}>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className={`${compact ? 'text-2xl' : 'text-4xl'} font-bold select-none`}
                        style={{
                          WebkitTextFillColor: 'transparent',
                          backgroundImage: getGradient(work),
                          backgroundClip: 'text',
                        }}
                      >
                        {displayNumber}
                      </span>
                      {work.repoUrl === null && <Lock className="size-3 text-muted-foreground" />}
                    </div>

                    <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-bold text-foreground mb-2 line-clamp-2`}>
                      {work.title}
                    </h3>

                    {work.role && (
                      <p className={`${compact ? 'text-[11px]' : 'text-sm'} text-muted-foreground mb-3 truncate`}>
                        {work.role}
                      </p>
                    )}

                    <p
                      className={`${compact ? 'text-[11px]' : 'text-sm'} text-muted-foreground line-clamp-4 leading-relaxed flex-1`}
                    >
                      {work.summary}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-auto pt-3">
                      {work.techStack.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className={`${compact ? 'text-[9px]' : 'text-xs'} px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground`}
                        >
                          {tech}
                        </span>
                      ))}
                      {work.techStack.length > 3 && (
                        <span
                          className={`${compact ? 'text-[9px]' : 'text-xs'} px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground`}
                        >
                          +{work.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass hover:bg-white/10 transition-colors cursor-pointer z-200"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass hover:bg-white/10 transition-colors cursor-pointer z-200"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {!compact && activeWork && (
          <button
            type="button"
            onClick={() => onSelect(activeWork.id)}
            className="flex items-center justify-center gap-1.5 text-sm font-semibold text-primary mt-4 mx-auto px-5 py-2 rounded-full border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer animate-pulse"
          >
            <MousePointerClick className="size-4" />
            View Details
          </button>
        )}
      </div>

      {activeWork && (
        <div className="glass rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-foreground">{activeWork.title}</h3>
            {activeWork.repoUrl === null && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="size-3" />
                Private
              </span>
            )}
          </div>

          {(activeWork.role || formatPeriod(activeWork)) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {activeWork.role && <span>{activeWork.role}</span>}
              {activeWork.role && formatPeriod(activeWork) && <span>·</span>}
              {formatPeriod(activeWork) && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {formatPeriod(activeWork)}
                </span>
              )}
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed">{activeWork.summary}</p>

          {activeWork.highlights.length > 0 && (
            <ul className="space-y-1.5">
              {activeWork.highlights.map(h => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {activeWork.techStack.map(tech => (
              <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
