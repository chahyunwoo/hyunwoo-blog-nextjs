'use client'

import { useEffect, useRef } from 'react'

const STAR_COUNT = 120

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: STAR_COUNT }, () => {
      const y = Math.random() * canvas.height
      return {
        x: Math.random() * canvas.width,
        y,
        size: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.5 + 0.3,
        offset: Math.random() * Math.PI * 2,
      }
    })

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
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
