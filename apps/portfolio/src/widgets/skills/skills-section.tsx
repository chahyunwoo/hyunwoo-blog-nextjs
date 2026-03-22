'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { SkillGroup } from '@/entities/portfolio'
import { SectionHeader } from '@/shared/ui/section-header'
import { SkillOrbit } from './skill-orbit'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(skills[0]?.category ?? '')

  const activeGroup = skills.find(g => g.category === activeCategory)

  return (
    <section id="skills" className="section-padding">
      <SectionHeader title="Skills" description="Technologies and tools I use" />

      <div className="flex flex-col lg:flex-row gap-8 items-center">
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
