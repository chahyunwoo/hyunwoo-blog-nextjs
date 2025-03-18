import { InnerContainer } from "@/shared/ui/layout/inner-container";
import ProfileHeader from "@/_pages/about/ui/profile-header";
import BreifIntroduction from "@/_pages/about/ui/breif-introduction";
import Education from "@/_pages/about/ui/education";
import Skills from "@/_pages/about/ui/skills";
import RecentExperience from "@/_pages/about/ui/recent-experience";
import { Locale } from "@/_pages/about/model/types";
import { PROFILE_DATA } from "@/_pages/about/data";

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
        <BreifIntroduction profile={profile} />

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
