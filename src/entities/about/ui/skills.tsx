import type { Profile } from '@/shared/types'
import AboutContainer from '@/shared/ui/about-container'
import { Badge } from '@/shared/ui/badge'

export default function Skills({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="SKILLS">
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
    </AboutContainer>
  )
}
