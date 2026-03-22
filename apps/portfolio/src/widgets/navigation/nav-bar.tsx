'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const PDF_LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'jp', label: '日本語' },
]

interface NavBarProps {
  hasBanner?: boolean
}

export function NavBar({ hasBanner = false }: NavBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5)
    }

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: 0.1, rootMargin: '-20% 0px -70% 0px' },
    )

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const sections = document.querySelectorAll('section[id]')
    for (const section of sections) {
      observer.observe(section)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClick = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownload = async (locale: string) => {
    setIsGenerating(true)
    setShowDropdown(false)
    try {
      const { generateResumePdf } = await import('@/widgets/pdf-banner/resume-pdf')
      await generateResumePdf(locale)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed left-1/2 -translate-x-1/2 z-50 glass rounded-full px-2 py-1.5 ${hasBanner ? 'top-12' : 'top-4'}`}
        >
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleClick(item.href)}
                  className={`
                    relative px-4 py-1.5 text-sm rounded-full transition-colors cursor-pointer
                    ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
            <li className="relative ml-1 border-l border-white/10 pl-2" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(prev => !prev)}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full text-primary hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download className="size-3.5" />
                <span>PDF</span>
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 glass rounded-xl py-1 min-w-[120px] overflow-hidden"
                  >
                    {PDF_LOCALES.map(l => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => handleDownload(l.code)}
                        className="w-full px-4 py-2 text-sm text-foreground hover:bg-white/10 transition-colors cursor-pointer text-left"
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
