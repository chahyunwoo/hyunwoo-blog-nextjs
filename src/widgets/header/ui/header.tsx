import { InnerContainer } from "@/shared/ui/layout/inner-container";
import { ThemeSwitch } from "@/features/theme/ui/theme-switch";
import MobileMenu from "./mobile-menu";
import { MENU_ITEMS } from "../model/constants";
import DesktopMenu from "./desktop-menu";
import Link from "next/link";
import Logo from "./logo";
import { IconButton } from "@/shared/ui/components/button";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b bg-background">
      <InnerContainer className="h-12 flex items-center justify-between">
        {/* 데스크톱 화면에서만 보이는 제목 */}
        <Link href="/" className="hidden sm:block">
          <Logo />
        </Link>

        {/* 모바일 메뉴 */}
        <MobileMenu menuItems={MENU_ITEMS} />

        {/* 데스크톱 메뉴 */}
        <DesktopMenu items={MENU_ITEMS} />

        {/* github, theme switch*/}
        <div>
          <IconButton
            icon={Github}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            href="https://github.com/chahyunwoo"
          />
          <ThemeSwitch />
        </div>
      </InnerContainer>
    </header>
  );
}
