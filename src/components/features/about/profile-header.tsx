import { MapPin } from 'lucide-react'
import Image from 'next/image'
import CopyButton from '@/components/common/copy-button'
import LanguageSwitch from '@/components/features/language-switch'
import { IconButton } from '@/components/ui/button'
import type { Profile } from '@/types'
import profileImage from '../../../../public/images/chahyunwoo-profile.jpg'

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="flex gap-8 items-center justify-between flex-col-reverse md:flex-row pb-8 border-b border-border">
      <div className="flex flex-col items-center md:items-start">
        <LanguageSwitch />
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
          <CopyButton
            variant="outline"
            icon="Mail"
            description="이메일이 복사되었습니다."
            target="chahyunwoobi@gmail.com"
          />
        </div>
      </div>
      <div>
        <Image
          src={profileImage}
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
