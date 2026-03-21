import { ExternalLink } from 'lucide-react'
import type { Profile } from '@/shared/types'
import AboutContainer from '@/shared/ui/about-container'
import { Badge } from '@/shared/ui/badge'

export default function PersonalProjects({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="PERSONAL PROJECTS">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map(project => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border p-4 hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{project.title}</h3>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="secondary" className="text-[10px]">
                  {tech}
                </Badge>
              ))}
            </div>
          </a>
        ))}
      </div>
    </AboutContainer>
  )
}
