import type { Profile } from '@hyunwoo/shared/types'
import { AboutContainer, Badge, SectionError } from '@/shared/ui'

export function Skills({ profile }: { profile: Profile }) {
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
                  <Badge key={skill.name} variant="outline">
                    {skill.name}
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
