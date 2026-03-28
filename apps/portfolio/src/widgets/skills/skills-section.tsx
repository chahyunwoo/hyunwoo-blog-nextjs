'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { SkillGroup, SkillItem } from '@/entities/portfolio'
import { SectionHeader } from '@/shared/ui'
import { SkillOrbit } from './skill-orbit'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

function getProficiencyLabel(proficiency: number): string {
  if (proficiency >= 90) return 'Expert'
  if (proficiency >= 75) return 'Advanced'
  if (proficiency >= 60) return 'Proficient'
  return 'Familiar'
}

function getDotColor(proficiency: number): string {
  if (proficiency >= 90) return 'bg-emerald-400'
  if (proficiency >= 75) return 'bg-blue-400'
  if (proficiency >= 60) return 'bg-violet-400'
  return 'bg-white/30'
}

function getBorderColor(proficiency: number): string {
  if (proficiency >= 90) return 'border-emerald-500/40'
  if (proficiency >= 75) return 'border-blue-500/40'
  if (proficiency >= 60) return 'border-violet-500/40'
  return 'border-white/10'
}

function getLabelColor(proficiency: number): string {
  if (proficiency >= 90) return 'text-emerald-400'
  if (proficiency >= 75) return 'text-blue-400'
  if (proficiency >= 60) return 'text-violet-400'
  return 'text-white/30'
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
}

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, scale: 0.94, transition: { duration: 0.15, ease: 'easeIn' } },
}

function MobileSkillChip({ skill }: { skill: SkillItem }) {
  return (
    <motion.div
      variants={chipVariants}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-white/3 ${getBorderColor(skill.proficiency)}`}
    >
      <span className={`size-1.5 rounded-full shrink-0 ${getDotColor(skill.proficiency)}`} />
      <span className="text-sm font-medium text-foreground/90 truncate">{skill.name}</span>
      <span className={`ml-auto text-[10px] font-semibold shrink-0 ${getLabelColor(skill.proficiency)}`}>
        {getProficiencyLabel(skill.proficiency)}
      </span>
    </motion.div>
  )
}

const LEGEND = [
  { label: 'Expert', color: 'bg-emerald-400' },
  { label: 'Advanced', color: 'bg-blue-400' },
  { label: 'Proficient', color: 'bg-violet-400' },
  { label: 'Familiar', color: 'bg-white/30' },
] as const

function AnimatedChipGrid({ items, category }: { items: SkillItem[]; category: string }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setHeight(el.scrollHeight)
    })
    ro.observe(el)
    setHeight(el.scrollHeight)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.div
      animate={{ height }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={innerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 gap-2 pb-1"
          >
            {items.map(skill => (
              <MobileSkillChip key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(skills[0]?.category ?? '')

  const activeGroup = skills.find(g => g.category === activeCategory)
  const sortedItems = activeGroup?.items.slice().sort((a, b) => b.proficiency - a.proficiency) ?? []

  return (
    <section id="skills" className="section-padding">
      <SectionHeader title="Skills" description="Technologies and tools I use" />

      {/* 모바일 UI */}
      <div className="md:hidden space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map(group => (
            <button
              key={group.category}
              type="button"
              onClick={() => setActiveCategory(group.category)}
              className={`
                px-4 py-2 text-sm rounded-full transition-all cursor-pointer
                ${
                  activeCategory === group.category
                    ? 'bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20'
                    : 'bg-white/5 border border-white/10 text-muted-foreground'
                }
              `}
            >
              {group.category}
            </button>
          ))}
        </div>

        <div className="border-t border-white/8 pt-4">
          <AnimatedChipGrid items={sortedItems} category={activeCategory} />
        </div>

        <div className="flex items-center gap-3 pt-1 flex-wrap border-t border-white/8">
          {LEGEND.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${color}`} />
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 데스크톱 UI */}
      <div className="hidden md:flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex flex-row lg:flex-col gap-2 flex-wrap justify-center lg:w-48 shrink-0">
          {skills.map(group => (
            <motion.button
              key={group.category}
              type="button"
              onClick={() => setActiveCategory(group.category)}
              className={`
                px-4 py-2.5 text-sm rounded-xl transition-all cursor-pointer text-left
                ${
                  activeCategory === group.category
                    ? 'bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20'
                    : 'glass text-muted-foreground hover:text-foreground hover:bg-white/10'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{group.category}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 flex justify-center">
          {activeGroup && <SkillOrbit key={activeCategory} group={activeGroup} />}
        </div>
      </div>
    </section>
  )
}
