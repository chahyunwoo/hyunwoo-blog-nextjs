import type { Profile } from '@/types'
import AboutContainer from '../../layout/about-container'
import EducationCard from './education-card'

export default function Education({ profile }: { profile: Profile }) {
  return (
    <AboutContainer title="EDUCATION">
      <ul className="flex flex-col gap-4">
        {profile.education.map(education => (
          <li key={education.institution}>
            <EducationCard {...education} />
          </li>
        ))}
      </ul>
    </AboutContainer>
  )
}
