import { InnerContainer } from "@/components/layout/inner-container";
import ProfileHeader from "@/components/features/about/profile-header";
import Education from "@/components/features/about/education";
import Skills from "@/components/features/about/skills";
import RecentExperience from "@/components/features/about/recent-experience";
import type { Locale } from "@/types";
import { PROFILE_DATA } from "@/data/i18n";
import BriefIntroduction from "@/components/features/about/brief-introduction";
import type { Params } from "@/types";

export function generateStaticParams() {
  return Object.keys(PROFILE_DATA).map((locale) => ({
    locale,
  }));
}

const BASE_URL = "https://chahyunwoo.dev";

export async function generateMetadata({ params }: Params<{ locale: Locale }>) {
  const { locale } = await params;
  const profile = PROFILE_DATA[locale];

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
  };
}

function getPersonJsonLd(profile: (typeof PROFILE_DATA)["ko"]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: BASE_URL,
    jobTitle: profile.job,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: profile.link.map((l) => l.href),
  };
}

export default async function Page({ params }: Params<{ locale: Locale }>) {
  const { locale } = await params;
  const profile = PROFILE_DATA[locale];

  return (
    <InnerContainer className="py-12" data-locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonJsonLd(profile)),
        }}
      />
      <div className="max-w-2xl mx-auto">
        <ProfileHeader profile={profile} />

        {/* 소개글 */}
        <BriefIntroduction profile={profile} />

        {/* 학력사항 */}
        <Education profile={profile} />

        {/* 기술스택 */}
        <Skills />

        {/* 경력사항 */}
        <RecentExperience profile={profile} />
      </div>
    </InnerContainer>
  );
}
