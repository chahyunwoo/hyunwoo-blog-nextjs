import type { Profile } from '@hyunwoo/shared/types'
import AboutContainer from '@/shared/ui/about-container'
import { Badge } from '@/shared/ui/badge'
import { SectionError } from '@/shared/ui/error'

export default function RecentExperience({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="EXPERIENCE">
      {profile.experience === null ? (
        <SectionError label="경력" />
      ) : (
        <div className="relative ml-3">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {profile.experience.map(experience => (
              <div key={experience.title} className="relative pl-7">
                <div className="absolute -left-[5px] top-[6px] w-[10px] h-[10px] rounded-full border-2 border-primary bg-background" />
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-[15px] leading-snug">{experience.title}</h3>
                    <Badge variant="outline" className="text-[11px] w-fit shrink-0">
                      {experience.period}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary font-medium mb-3">{experience.role}</p>
                  <ul className="space-y-1.5 text-[13px] text-muted-foreground leading-relaxed">
                    {experience.responsibilities.map(item => (
                      <li key={item} className="flex gap-2">
                        <span className="text-border mt-[7px] shrink-0 w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AboutContainer>
  )
}
