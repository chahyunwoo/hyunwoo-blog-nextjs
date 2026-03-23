'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface HeroContentProps {
  name: string
  jobTitle: string
}

const TITLE = 'Portfolio'

function MagneticLetter({
  char,
  index,
  mousePosRef,
}: {
  char: string
  index: number
  mousePosRef: React.RefObject<{ x: number; y: number }>
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 12 })
  const springY = useSpring(y, { stiffness: 120, damping: 12 })
  const scale = useSpring(1, { stiffness: 200, damping: 20 })
  const rotate = useSpring(0, { stiffness: 80, damping: 12 })

  useEffect(() => {
    let rafId: number

    const tick = () => {
      if (!ref.current) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const mousePos = mousePosRef.current
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = mousePos.x - centerX
      const dy = mousePos.y - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const radius = 350

      const time = Date.now() * 0.001
      const floatX = Math.sin(time * 0.8 + index * 1.2) * 2
      const floatY = Math.cos(time * 0.6 + index * 0.9) * 1.5

      if (dist < radius) {
        const strength = 1 - dist / radius
        const force = strength * 60
        x.set((-dx / dist) * force + floatX)
        y.set((-dy / dist) * force + floatY)
        scale.set(1 + strength * 0.4)
        rotate.set((dx / dist) * strength * 20)
      } else {
        const maxDist = Math.max(window.innerWidth, window.innerHeight)
        const pull = (1 - dist / maxDist) * 45
        x.set((dx / dist) * pull + floatX)
        y.set((dy / dist) * pull + floatY)
        scale.set(1)
        rotate.set(0)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [x, y, scale, rotate, index, mousePosRef])

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
      className="text-shimmer"
    >
      {char}
    </motion.span>
  )
}

export function HeroContent({ name, jobTitle }: HeroContentProps) {
  const mousePosRef = useRef({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 40, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15 })

  const subtitleX = useTransform(springX, v => v * -6)
  const subtitleY = useTransform(springY, v => v * -4)
  const nameX = useTransform(springX, v => v * 8)
  const nameY = useTransform(springY, v => v * 5)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(nx)
      mouseY.set(ny)
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pointer-events-none">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          x: subtitleX,
          y: subtitleY,
          filter:
            'drop-shadow(0 3px 6px rgba(108,60,224,0.6)) drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 1px 0px rgba(255,255,255,0.12))',
        }}
        className="text-base md:text-lg tracking-[0.3em] uppercase text-shimmer mb-4 font-semibold"
      >
        {jobTitle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(108,60,224,0.4))' }}
      >
        {TITLE.split('').map((char, i) => (
          <MagneticLetter key={`${char}-${i}`} char={char} index={i} mousePosRef={mousePosRef} />
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{
          x: nameX,
          y: nameY,
          filter:
            'drop-shadow(0 3px 6px rgba(108,60,224,0.6)) drop-shadow(0 8px 18px rgba(0,0,0,0.5)) drop-shadow(0 1px 0px rgba(255,255,255,0.12))',
        }}
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
