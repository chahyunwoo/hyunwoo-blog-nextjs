import { IconButton } from "@/shared/ui/components/button";
import { MapPin } from "lucide-react";
import Image from "next/image";
import profileImage from "../../../../public/images/chahyunwoo-profile.jpg";
import { EmailButton } from "./components/email-button";
import { Profile } from "../model/types";
import LanguageSwitch from "@/features/language/ui/language-switch";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="flex gap-4 items-center md:items-end justify-between flex-col-reverse md:flex-row pb-6">
      <div className="flex flex-col items-center md:items-start">
        <LanguageSwitch />
        <h1 className="font-black text-2xl mb-4">{profile.name}</h1>
        <p className="text-muted-foreground mb-1 max-w-[400px] text-center md:text-left min-h-[48px]">
          {profile.job}
        </p>
        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{profile.location}</span>
        </p>
        <div className="flex items-center gap-2 mt-4">
          {profile.link.map((link) => (
            <IconButton
              key={link.name}
              variant="outline"
              icon={link.icon}
              className="cursor-pointer"
              href={link.href}
            />
          ))}
          <EmailButton
            email="chahyunwoobi@gmail.com"
            copyString={profile.copied}
          />
        </div>
      </div>
      <div className="mt-4">
        <Image
          src={profileImage}
          alt="profile"
          className="rounded-full"
          width={200}
          height={200}
          priority
        />
      </div>
    </div>
  );
}
