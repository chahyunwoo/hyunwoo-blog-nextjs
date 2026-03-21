import { PROFILE_DATA } from '@/entities/about/data/i18n'
import BriefIntroduction from '@/entities/about/ui/brief-introduction'
import Education from '@/entities/about/ui/education'
import PersonalProjects from '@/entities/about/ui/personal-projects'
import ProfileHeader from '@/entities/about/ui/profile-header'
import RecentExperience from '@/entities/about/ui/recent-experience'
import Skills from '@/entities/about/ui/skills'
import type { Locale, Params } from '@/shared/types'
import { InnerContainer } from '@/shared/ui/inner-container'

export function generateStaticParams() {
  return Object.keys(PROFILE_DATA).map(locale => ({
    locale,
  }))
}

const BASE_URL = 'https://chahyunwoo.dev'

export async function generateMetadata({ params }: Params<{ locale: Locale }>) {
  const { locale } = await params
  const profile = PROFILE_DATA[locale]

  return {
    title: `${profile.name} | ${profile.job}`,
    description: `${profile.introduction}`,
    alternates: {
      canonical: `${BASE_URL}/about/${locale}`,
      languages: {
        ko: `${BASE_URL}/about/ko`,
        en: `${BASE_URL}/about/en`,
        ja: `${BASE_URL}/about/jp`,
      },
    },
    openGraph: {
      title: `${profile.name} | ${profile.job}`,
      description: `${profile.introduction}`,
      images: [
        {
          url: `${BASE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${profile.name} | ${profile.job}`,
        },
      ],
    },
  }
}

function getPersonJsonLd(profile: (typeof PROFILE_DATA)['ko']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: BASE_URL,
    jobTitle: profile.job,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    sameAs: profile.link.map(l => l.href),
  }
}

export default async function Page({ params }: Params<{ locale: Locale }>) {
  const { locale } = await params
  const profile = PROFILE_DATA[locale]

  return (
    <InnerContainer className="py-12" data-locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonJsonLd(profile)),
        }}
      />
      <div className="max-w-3xl mx-auto">
        <ProfileHeader profile={profile} />
        <BriefIntroduction profile={profile} />
        <Skills profile={profile} />
        <Education profile={profile} />
        <PersonalProjects profile={profile} />
        <RecentExperience profile={profile} />
      </div>
    </InnerContainer>
  )
}
