'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { Mesh } from 'three'

const VERT = `
uniform float uTime;
uniform float uScroll;
varying vec3 vNormal;
varying float vDisplacement;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vNormal=normal;
  float strength=0.3+uScroll*0.5;
  float noise=snoise(position*1.5+uTime*0.3)*strength;
  float noise2=snoise(position*3.0-uTime*0.5)*0.1;
  vDisplacement=noise+noise2;
  vec3 newPosition=position+normal*vDisplacement;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.0);
}
`

const FRAG = `
uniform float uTime;
uniform float uScroll;
varying vec3 vNormal;
varying float vDisplacement;

void main(){
  vec3 deepPurple=vec3(0.35,0.15,0.85);
  vec3 hotPink=vec3(0.9,0.15,0.5);
  vec3 electricBlue=vec3(0.2,0.5,1.0);

  float mixFactor=vDisplacement*2.5+0.5;
  vec3 color=mix(deepPurple,hotPink,clamp(mixFactor,0.,1.));
  color=mix(color,electricBlue,clamp(mixFactor-0.8,0.,1.));
  color=mix(color,hotPink,uScroll*0.6);

  float fresnel=pow(1.-abs(dot(vNormal,vec3(0.,0.,1.))),2.5);
  color+=fresnel*vec3(0.3,0.2,0.5);

  gl_FragColor=vec4(color,0.88);
}
`

export function ScrollSphere() {
  const meshRef = useRef<Mesh>(null)
  const scrollRef = useRef(0)
  const smoothScroll = useRef(0)
  const uniforms = useRef({
    uTime: { value: 0 },
    uScroll: { value: 0 },
  })

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    smoothScroll.current += (scrollRef.current - smoothScroll.current) * 0.06
    uniforms.current.uTime.value = t
    uniforms.current.uScroll.value = smoothScroll.current
    meshRef.current.rotation.y = t * 0.12 + smoothScroll.current * 0.8
    meshRef.current.rotation.x = smoothScroll.current * 0.3
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.0, 32]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
