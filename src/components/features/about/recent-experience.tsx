import AboutContainer from "../../layout/about-container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Profile } from "@/types";

export default function RecentExperience({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="RECENT EXPERIENCE">
      {profile.experience.map((experience, index) => (
        <Card
          key={index}
          className={`bg-background ${index > 0 ? "mt-4" : ""}`}
        >
          <CardHeader>
            <CardTitle className="flex flex-col gap-2">
              <p className="text-lg font-extrabold">{experience.title}</p>
              <span className="text-muted-foreground font-normal text-xs">
                {experience.period}
              </span>
            </CardTitle>
            <CardDescription>
              <h3 className="text-lg font-extrabold text-accent-foreground mt-2">
                {experience.role}
              </h3>
              <ul className="list-disc flex flex-col gap-1.5 mt-2 pl-4">
                {experience.responsibilities.map((item, i) => (
                  <li key={i}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </AboutContainer>
  );
}
