import type { ProfileResponse } from '@/entities/portfolio'
import { HeroCanvas } from './hero-canvas'
import { HeroContent } from './hero-content'

interface HeroSectionProps {
  profile: ProfileResponse
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 h-screen">
        <HeroCanvas />
      </div>
      <HeroContent name={profile.name} jobTitle={profile.jobTitle} iconUrl={profile.iconUrl} />
    </section>
  )
}
