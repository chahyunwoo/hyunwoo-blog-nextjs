import { Badge } from '@/components/ui/badge'
import type { Profile } from '@/types'
import AboutContainer from '../../layout/about-container'

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
