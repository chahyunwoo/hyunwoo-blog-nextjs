import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const REPEL_RADIUS = 350
const REPEL_FORCE = 60
const ATTRACT_MULTIPLIER = 45

interface UseMagneticLetterOptions {
  mousePosRef: React.RefObject<{ x: number; y: number }>
  index: number
}

export function useMagneticLetter({ mousePosRef, index }: UseMagneticLetterOptions) {
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

      const time = Date.now() * 0.001
      const floatX = Math.sin(time * 0.8 + index * 1.2) * 2
      const floatY = Math.cos(time * 0.6 + index * 0.9) * 1.5

      if (dist < REPEL_RADIUS) {
        const strength = 1 - dist / REPEL_RADIUS
        const force = strength * REPEL_FORCE
        x.set((-dx / dist) * force + floatX)
        y.set((-dy / dist) * force + floatY)
        scale.set(1 + strength * 0.4)
        rotate.set((dx / dist) * strength * 20)
      } else {
        const maxDist = Math.max(window.innerWidth, window.innerHeight)
        const pull = (1 - dist / maxDist) * ATTRACT_MULTIPLIER
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

  return { ref, springX, springY, scale, rotate }
}
