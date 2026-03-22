'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uHover;
  uniform float uClick;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec3 vWorldPos;
  varying float vMouseProximity;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normal;
    vWorldPos = position;

    // mouse-facing vertices get way more distortion
    vec3 mouseDir = normalize(vec3(uMouse * 2.0, 0.6));
    float facing = max(0.0, dot(normalize(position), mouseDir));
    vMouseProximity = facing;

    float mouseBoost = facing * facing * uHover * 0.6;
    float baseStrength = 0.3 + uHover * 0.25 + mouseBoost;

    float noise = snoise(position * 1.5 + uTime * 0.3) * baseStrength;
    float noise2 = snoise(position * 3.0 - uTime * 0.5) * (0.1 + mouseBoost * 0.2);
    float spike = snoise(position * 5.0 + uTime * 0.8) * mouseBoost * 0.3;

    vDisplacement = noise + noise2 + spike;
    vec3 newPosition = position + normal * vDisplacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uHover;
  uniform float uClick;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying float vDisplacement;
  varying vec3 vWorldPos;
  varying float vMouseProximity;

  void main() {
    vec3 deepPurple = vec3(0.35, 0.15, 0.85);
    vec3 hotPink = vec3(0.9, 0.15, 0.5);
    vec3 electricBlue = vec3(0.2, 0.5, 1.0);
    vec3 cyan = vec3(0.1, 0.8, 0.9);
    vec3 gold = vec3(1.0, 0.7, 0.2);

    // base color from displacement
    float mixFactor = vDisplacement * 2.5 + 0.5;
    vec3 color = mix(deepPurple, hotPink, clamp(mixFactor, 0.0, 1.0));
    color = mix(color, electricBlue, clamp(mixFactor - 0.8, 0.0, 1.0));

    // 4-corner color mapping (extreme)
    float mx = uMouse.x * 0.5 + 0.5;
    float my = uMouse.y * 0.5 + 0.5;
    vec3 topLeft = vec3(0.0, 0.3, 1.0);      // blue
    vec3 topRight = vec3(0.0, 1.0, 0.4);     // green
    vec3 bottomLeft = vec3(1.0, 0.0, 0.3);   // red
    vec3 bottomRight = vec3(1.0, 0.9, 0.0);  // yellow
    vec3 top = mix(topLeft, topRight, mx);
    vec3 bottom = mix(bottomLeft, bottomRight, mx);
    vec3 mouseColor = mix(bottom, top, my);
    color = mix(color, mouseColor, uHover * 0.85);

    // bright glow on mouse-facing side
    color += vMouseProximity * uHover * vec3(0.3, 0.2, 0.4);

    // energy pulse on mouse proximity
    float pulse = sin(uTime * 3.0 + vMouseProximity * 6.28) * 0.5 + 0.5;
    color += vMouseProximity * uHover * pulse * vec3(0.15, 0.1, 0.2);

    // fresnel rim with mouse-reactive color
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    vec3 rimColor = mix(vec3(0.3, 0.2, 0.5), mouseColor, uHover * 0.5);
    color += fresnel * rimColor;

    // click rim flash
    color += uClick * fresnel * vec3(0.15, 0.1, 0.25);

    gl_FragColor = vec4(color, 0.88);
  }
`

export function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseSmooth = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uClick: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  )

  useEffect(() => {
    const handleClick = () => {
      if (window.scrollY < window.innerHeight * 0.3) {
        uniforms.uClick.value = 1.0
        window.dispatchEvent(new Event('hero-explode'))
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [uniforms])

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return
    uniforms.uTime.value = clock.getElapsedTime()

    // smooth mouse
    mouseSmooth.current.x += (pointer.x - mouseSmooth.current.x) * 0.08
    mouseSmooth.current.y += (pointer.y - mouseSmooth.current.y) * 0.08
    uniforms.uMouse.value.set(mouseSmooth.current.x, mouseSmooth.current.y)

    // hover intensity
    const dist = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y)
    const targetHover = dist < 1.5 ? 1.0 - dist / 1.5 : 0
    uniforms.uHover.value += (targetHover - uniforms.uHover.value) * 0.08

    // click decay
    uniforms.uClick.value *= 0.93

    // tilt toward mouse + click spin boost
    const spinSpeed = 0.001 + uniforms.uClick.value * 0.03
    const targetRotX = -mouseSmooth.current.y * 0.4
    const targetRotY = mouseSmooth.current.x * 0.4
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.y += spinSpeed
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 64]} />
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
