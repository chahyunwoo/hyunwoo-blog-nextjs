'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface HeroContentProps {
  name: string
  jobTitle: string
  iconUrl: string
}

export function HeroContent({ name, jobTitle, iconUrl }: HeroContentProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pointer-events-none">
      {iconUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="size-20 md:size-24 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-background mx-auto">
            <Image src={iconUrl} alt={name} width={96} height={96} className="size-full object-cover" priority />
          </div>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-base md:text-lg tracking-[0.3em] uppercase text-shimmer mb-4 font-semibold"
      >
        {jobTitle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold text-shimmer"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(108,60,224,0.4))' }}
      >
        Portfolio
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-4 text-shimmer text-lg md:text-xl font-semibold"
      >
        {name}
      </motion.p>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        onClick={() => {
          document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="mt-16 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer pointer-events-auto"
      >
        <span className="text-sm tracking-widest uppercase font-medium">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.button>
    </div>
  )
}
