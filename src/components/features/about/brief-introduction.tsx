import AboutContainer from "../../layout/about-container";
import type { Profile } from "@/types";

export default function BriefIntroduction({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="BRIEF INTRODUCTION">
      <p className="text-muted-foreground leading-relaxed">
        <span className="hidden md:inline">
          {profile.introduction[0]}
          <br />
          {profile.introduction[1]}
          <br />
          {profile.introduction[2]}
        </span>
        <span className="md:hidden">
          {profile.introduction[0]} {profile.introduction[1]}
          {profile.introduction[2]}
        </span>
      </p>
    </AboutContainer>
  );
}
