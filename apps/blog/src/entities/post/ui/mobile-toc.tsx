'use client'

import { List, X } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { cn } from '@hyunwoo/shared/lib'

interface Heading {
  id: string
  text: string
  level: number
}

export function MobileTOC({ skipFirstHeading = true }: { skipFirstHeading?: boolean }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))

    const headingData = headingElements
      .map(heading => ({
        id: heading.id,
        text: heading.textContent?.trim() || '',
        level: parseInt(heading.tagName[1], 10),
      }))
      .filter((_, index) => !skipFirstHeading || index !== 0)
      .filter(heading => heading.id && heading.text)

    setHeadings(headingData)

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 },
    )

    const toObserve = skipFirstHeading ? headingElements.slice(1) : headingElements
    for (const el of toObserve) {
      if (el.id) observer.observe(el)
    }

    return () => {
      for (const el of toObserve) {
        if (el.id) observer.unobserve(el)
      }
    }
  }, [skipFirstHeading])

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' })
    }
  }, [])

  const minLevel = useMemo(() => Math.min(...headings.map(h => h.level)), [headings])

  if (headings.length === 0) return null

  return (
    <div className="xl:hidden not-prose">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-20 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
        aria-label="목차 열기"
      >
        <List className="h-5 w-5" />
      </button>

      {isOpen && (
        <dialog
          className="fixed inset-0 z-50 bg-transparent m-0 w-full h-full"
          open
          onClick={() => setIsOpen(false)}
          onKeyDown={e => e.key === 'Escape' && setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            role="dialog"
            aria-label="목차"
            className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl max-h-[70vh] flex flex-col animate-in slide-in-from-bottom duration-200"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.key === 'Escape' && setIsOpen(false)}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <p className="text-sm font-semibold">목차</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center cursor-pointer transition-colors"
                aria-label="목차 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="overflow-y-auto px-5 py-4 space-y-0.5" aria-label="Table of contents">
              {headings.map(heading => {
                const indent = (heading.level - minLevel) * 16
                const isActive = activeId === heading.id

                return (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={e => handleLinkClick(e, heading.id)}
                    style={{ paddingLeft: `${indent}px` }}
                    className={cn(
                      'block py-2 text-sm transition-colors rounded-md px-3',
                      isActive
                        ? 'text-primary bg-primary/5 font-medium'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {heading.text}
                  </a>
                )
              })}
            </nav>
          </div>
        </dialog>
      )}
    </div>
  )
}
