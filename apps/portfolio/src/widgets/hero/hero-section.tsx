import type { ProfileResponse } from '@/entities/portfolio'
import { HeroCanvas } from './hero-canvas'
import { HeroContent } from './hero-content'
import { MobileOrb } from './mobile-orb'

interface HeroSectionProps {
  profile: ProfileResponse
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section aria-label="Hero" className="relative min-h-screen">
      <div className="absolute inset-0 hidden md:block">
        <HeroCanvas />
      </div>
      <div className="absolute inset-0 md:hidden">
        <MobileOrb />
      </div>
      <HeroContent name={profile.name} jobTitle={profile.jobTitle} />
    </section>
  )
}
