'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">{title}</h2>
      {description && <p className="text-muted-foreground text-base md:text-lg">{description}</p>}
    </motion.div>
  )
}
