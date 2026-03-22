'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { MorphingSphere } from './particle-field'

export function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <MorphingSphere />
        </Suspense>
      </Canvas>
    </div>
  )
}
