'use client'

import { motion } from 'framer-motion'
import { useMagneticLetter } from '@/shared/hooks'

interface MagneticLetterProps {
  char: string
}

export function MagneticLetter({ char }: MagneticLetterProps) {
  const { ref, springX, springY, scale, rotate, handlers } = useMagneticLetter()

  return (
    <motion.span
      ref={ref}
      style={{
        x: springX,
        y: springY,
        scale,
        rotate,
        display: 'inline-block',
        filter:
          'drop-shadow(0 3px 4px rgba(108,60,224,0.7)) drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 1px 0px rgba(255,255,255,0.15))',
      }}
      className="text-shimmer pointer-events-auto cursor-default"
      {...handlers}
    >
      {char}
    </motion.span>
  )
}
