import type { Profile } from '@hyunwoo/shared/types'
import { AboutContainer, Badge, SectionError } from '@/shared/ui'

export function Education({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="EDUCATION">
      {profile.education === null ? (
        <SectionError label="학력" />
      ) : (
        <div className="relative ml-3">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {profile.education.map(edu => (
              <div key={edu.institution} className="relative pl-7">
                <div className="absolute -left-[5px] top-[6px] w-[10px] h-[10px] rounded-full border-2 border-primary bg-background" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="font-semibold text-[15px] leading-snug">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{edu.degree}</p>
                  </div>
                  <Badge variant="outline" className="text-[11px] w-fit shrink-0">
                    {edu.period}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AboutContainer>
  )
}
