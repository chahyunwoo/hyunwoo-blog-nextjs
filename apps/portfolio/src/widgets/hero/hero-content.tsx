'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { HERO_TITLE, WORKS_SECTION_ID } from './constants'
import { MagneticLetter } from './magnetic-letter'
import { MobileHeroContent } from './mobile-hero-content'

interface HeroContentProps {
  name: string
  jobTitle: string
}

const TITLE_CHARS = HERO_TITLE.split('').map((char, i) => ({ char, id: `title-${char}-${i}` }))

export function HeroContent({ name, jobTitle }: HeroContentProps) {
  return (
    <>
      {/* 데스크톱: 풀스크린 센터 레이아웃 */}
      <div className="relative z-10 hidden md:flex flex-col items-center justify-center min-h-screen text-center px-6 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            filter:
              'drop-shadow(0 3px 6px rgba(108,60,224,0.6)) drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 1px 0px rgba(255,255,255,0.12))',
          }}
          className="text-lg tracking-[0.3em] uppercase text-shimmer mb-4 font-semibold"
        >
          {jobTitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-8xl lg:text-9xl font-bold"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(108,60,224,0.4))' }}
        >
          {TITLE_CHARS.map(({ char, id }) => (
            <MagneticLetter key={id} char={char} />
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{
            filter:
              'drop-shadow(0 3px 6px rgba(108,60,224,0.6)) drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 1px 0px rgba(255,255,255,0.12))',
          }}
          className="mt-4 text-shimmer text-xl font-semibold"
        >
          {name}
        </motion.p>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          onClick={() => {
            document.getElementById(WORKS_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' })
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

      {/* 모바일: 구체 배경 위에 텍스트 중앙 배치 */}
      <MobileHeroContent name={name} jobTitle={jobTitle} />
    </>
  )
}
