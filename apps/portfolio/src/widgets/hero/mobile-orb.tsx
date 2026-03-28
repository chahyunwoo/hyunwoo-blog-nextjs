'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useLoadingStore } from '@/shared/store'
import { AuroraLayer } from './aurora-layer'
import { ScrollSphere } from './scroll-sphere'
import { ShaderWarmup } from './shader-warmup'

export function MobileOrb() {
  const isLoaded = useLoadingStore(s => s.isLoaded)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded || !canvasWrapRef.current) return
    canvasWrapRef.current.style.opacity = '1'
  }, [isLoaded])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }} aria-hidden="true">
      <AuroraLayer />
      {/* Canvas는 항상 마운트 — 로딩 화면 중에 셰이더 컴파일 완료 */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 1.2s ease', willChange: 'opacity' }}
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <ScrollSphere />
          <ShaderWarmup />
        </Canvas>
      </div>
    </div>
  )
}
