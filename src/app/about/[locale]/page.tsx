import { InnerContainer } from "@/components/layout/inner-container";
import ProfileHeader from "@/components/features/about/profile-header";
import Education from "@/components/features/about/education";
import Skills from "@/components/features/about/skills";
import RecentExperience from "@/components/features/about/recent-experience";
import type { Locale } from "@/types";
import { PROFILE_DATA } from "@/data/i18n";
import BriefIntroduction from "@/components/features/about/brief-introduction";

type Params = Promise<{ locale: Locale }>;

export function generateStaticParams() {
  return Object.keys(PROFILE_DATA).map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const profile = PROFILE_DATA[locale];

  return {
    title: `${profile.name} | ${profile.job}`,
    description: `${profile.introduction}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;
  const profile = PROFILE_DATA[locale];

  return (
    <InnerContainer className="py-12">
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
