import { useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'

const REPEL_RADIUS = 150
const REPEL_FORCE = 40
const TOUCH_FORCE = 55

export function useMagneticLetter() {
  const ref = useRef<HTMLSpanElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  const scale = useSpring(1, { stiffness: 200, damping: 20 })
  const rotate = useSpring(0, { stiffness: 80, damping: 12 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < REPEL_RADIUS) {
        const strength = 1 - dist / REPEL_RADIUS
        const force = strength * REPEL_FORCE
        x.set((-dx / dist) * force)
        y.set((-dy / dist) * force)
        scale.set(1 + strength * 0.3)
        rotate.set((dx / dist) * strength * 15)
      }
    },
    [x, y, scale, rotate],
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    scale.set(1)
    rotate.set(0)
  }, [x, y, scale, rotate])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!ref.current) return
      const touch = e.touches[0]
      if (!touch) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = touch.clientX - centerX
      const dy = touch.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy) || 1

      const direction = { x: dx / dist, y: dy / dist }
      x.set(direction.x * TOUCH_FORCE)
      y.set(direction.y * TOUCH_FORCE)
      scale.set(1.4)
      rotate.set(direction.x * 20)

      setTimeout(() => {
        x.set(0)
        y.set(0)
        scale.set(1)
        rotate.set(0)
      }, 400)
    },
    [x, y, scale, rotate],
  )

  return {
    ref,
    springX,
    springY,
    scale,
    rotate,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
    },
  }
}
