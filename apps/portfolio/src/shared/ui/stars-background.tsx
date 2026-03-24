'use client'

import { useEffect, useRef } from 'react'

const STAR_COUNT = 120

function generateStars(width: number, height: number) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.5,
    speed: Math.random() * 0.5 + 0.3,
    offset: Math.random() * Math.PI * 2,
  }))
}

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let resizeTimer: ReturnType<typeof setTimeout>
    let stars = generateStars(window.innerWidth, window.innerHeight)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        stars = generateStars(canvas.width, canvas.height)
      }, 150)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf: number
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / Math.max(docHeight, 1), 1)
      const starOpacity = Math.max(0.25, 1 - progress * 0.8)

      for (const star of stars) {
        const twinkle = (Math.sin(time * 0.001 * star.speed + star.offset) + 1) / 2
        const alpha = twinkle * 0.7 * starOpacity + 0.1 * starOpacity
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div aria-hidden="true">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
    </div>
  )
}
