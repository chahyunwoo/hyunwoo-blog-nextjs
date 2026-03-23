import { getProfile, getRecentPosts, getSkills, getWorks } from '@/entities/portfolio'
import { SUPPORTED_LOCALES } from '@/shared/config'
import { HeroSection } from '@/widgets/hero'
import { WorkMdxContent } from '@/widgets/works'
import { PortfolioClient } from './portfolio-client'

export default async function Page() {
  const [profile, worksKo, skills, worksEn, worksJp, recentPosts] = await Promise.all([
    getProfile(),
    getWorks('ko'),
    getSkills(),
    getWorks('en'),
    getWorks('jp'),
    getRecentPosts(),
  ])

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Failed to load portfolio data.</p>
      </main>
    )
  }

  const allWorks: Record<string, typeof worksKo> = { ko: worksKo, en: worksEn, jp: worksJp }

  const renderedContents: Record<string, Record<number, React.ReactNode>> = {}
  for (const locale of SUPPORTED_LOCALES) {
    renderedContents[locale] = {}
    for (const work of allWorks[locale]) {
      if (work.content) {
        renderedContents[locale][work.id] = <WorkMdxContent key={`${locale}-${work.id}`} content={work.content} />
      }
    }
  }

  return (
    <main>
      <HeroSection profile={profile} />
      <PortfolioClient
        profile={profile}
        allWorks={allWorks}
        skills={skills}
        renderedContents={renderedContents}
        recentPosts={recentPosts}
      />
    </main>
  )
}
