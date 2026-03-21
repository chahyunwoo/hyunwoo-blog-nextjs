import type { Profile } from '@hyunwoo/shared/types'
import AboutContainer from '@/shared/ui/about-container'
import { Badge } from '@/shared/ui/badge'
import { SectionError } from '@/shared/ui/error'

export default function Skills({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="SKILLS">
      {profile.skills === null ? (
        <SectionError label="스킬" />
      ) : (
        <div className="space-y-4">
          {profile.skills.map(group => (
            <div key={group.category}>
              <p className="text-xs text-muted-foreground mb-2">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AboutContainer>
  )
}
