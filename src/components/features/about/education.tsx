import AboutContainer from "../../layout/about-container";
import EducationCard from "./education-card";
import type { Profile } from "@/types";

export default function Education({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="EDUCATION">
      <ul className="flex flex-col gap-4">
        {profile.education.map((education) => (
          <li key={education.institution}>
            <EducationCard {...education} />
          </li>
        ))}
      </ul>
    </AboutContainer>
  );
}
