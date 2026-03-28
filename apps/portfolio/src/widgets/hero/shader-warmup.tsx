'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

export function ShaderWarmup() {
  const { gl, scene, camera } = useThree()
  const compiled = useRef(false)

  useFrame(() => {
    if (compiled.current) return
    compiled.current = true
    gl.compile(scene, camera)
  })

  return null
}
