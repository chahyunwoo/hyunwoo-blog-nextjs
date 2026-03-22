'use client'

import { useState } from 'react'
import type { ProfileResponse, SkillGroup, Work } from '@/entities/portfolio'
import type { RecentPost } from '@/entities/portfolio/api/portfolio.api'
import { ContactSection } from '@/widgets/contact'
import { DawnSkyline } from '@/widgets/contact/dawn-skyline'
import { NavBar } from '@/widgets/navigation'
import { PdfBanner } from '@/widgets/pdf-banner'
import { PostMarquee } from '@/widgets/posts'
import { SkillsSection } from '@/widgets/skills'
import { WorksSection } from '@/widgets/works'

interface PortfolioClientProps {
  profile: ProfileResponse
  allWorks: Record<string, Work[]>
  skills: SkillGroup[]
  renderedContents: Record<string, Record<number, React.ReactNode>>
  recentPosts: RecentPost[]
}

export function PortfolioClient({ profile, allWorks, skills, renderedContents, recentPosts }: PortfolioClientProps) {
  const [pdfBannerVisible, setPdfBannerVisible] = useState(true)

  return (
    <>
      <PdfBanner visible={pdfBannerVisible} onDismiss={() => setPdfBannerVisible(false)} />
      <NavBar hasBanner={pdfBannerVisible} />
      <WorksSection allWorks={allWorks} renderedContents={renderedContents} />
      <SkillsSection skills={skills} />
      <ContactSection socialLinks={profile.socialLinks} />
      <PostMarquee posts={recentPosts} />
      <p className="text-sm text-muted-foreground text-center py-6">
        &copy; {new Date().getFullYear()} Cha Hyunwoo. All rights reserved.
      </p>
      <DawnSkyline />
    </>
  )
}
