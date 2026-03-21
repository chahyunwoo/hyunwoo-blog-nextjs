'use client'

import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { cn } from '@/shared/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

export function PostTOC({ skipFirstHeading = true }: { skipFirstHeading?: boolean }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  const collectHeadings = useCallback(() => {
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
    return headingElements
  }, [skipFirstHeading])

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      h1, h2, h3, h4, h5, h6 {
        scroll-margin-top: 100px;
      }
    `
    document.head.appendChild(style)

    const headingElements = collectHeadings()

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      },
    )

    const elementsToObserve = skipFirstHeading ? headingElements.slice(1) : headingElements

    for (const heading of elementsToObserve) {
      if (heading.id) {
        observer.observe(heading)
      }
    }

    return () => {
      document.head.removeChild(style)

      for (const heading of elementsToObserve) {
        if (heading.id) {
          observer.unobserve(heading)
        }
      }
    }
  }, [collectHeadings, skipFirstHeading])

  const minLevel = useMemo(() => Math.min(...headings.map(h => h.level)), [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">On this page</p>
      <ul className="space-y-1 text-[13px] border-l border-border/40">
        {headings.map(heading => {
          const indent = (heading.level - minLevel) * 12
          const isActive = activeId === heading.id

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={e => handleLinkClick(e, heading.id)}
                style={{ paddingLeft: `${indent + 12}px` }}
                className={cn(
                  'block py-1 border-l-2 -ml-px transition-colors duration-150',
                  isActive
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border',
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
