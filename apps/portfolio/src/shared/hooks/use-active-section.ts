import { useEffect, useState } from 'react'

export function useActiveSection(selector: string, options?: IntersectionObserverInit): string {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: 0.1, rootMargin: '-20% 0px -70% 0px', ...options },
    )

    const sections = document.querySelectorAll(selector)
    for (const section of sections) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [selector, options])

  return activeSection
}
