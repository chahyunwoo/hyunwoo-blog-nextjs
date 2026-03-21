import { MapPin } from 'lucide-react'
import Image from 'next/image'
import type { ApiLocale } from '@/entities/about/model'
import LanguageSwitch from '@/features/navigation/language-switch'
import type { Profile } from '@/shared/types'
import { IconButton } from '@/shared/ui/button'
import CopyButton from '@/shared/ui/copy-button'

interface ProfileHeaderProps {
  profile: Profile
  locales: ApiLocale[]
}

export default function ProfileHeader({ profile, locales }: ProfileHeaderProps) {
  return (
    <div className="flex gap-8 items-center justify-between flex-col-reverse md:flex-row pb-8 border-b border-border">
      <div className="flex flex-col items-center md:items-start">
        <LanguageSwitch locales={locales} />
        <h1 className="font-black text-3xl mb-2 tracking-tight">{profile.name}</h1>
        <p className="text-primary font-medium mb-3">{profile.job}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          {profile.location}
        </p>
        <div className="flex items-center gap-2 mt-5">
          {profile.link.map(link => (
            <IconButton
              key={link.name}
              variant="outline"
              icon={link.icon}
              className="cursor-pointer h-9 w-9"
              href={link.href}
              aria-label={link.name}
            />
          ))}
          <CopyButton variant="outline" icon="Mail" description="Email copied!" target="chahyunwoobi@gmail.com" />
        </div>
      </div>
      <div>
        <Image
          src={profile.imageUrl}
          alt={`${profile.name}, ${profile.job}`}
          className="rounded-full ring-2 ring-border"
          width={180}
          height={180}
          priority
        />
      </div>
    </div>
  )
}
