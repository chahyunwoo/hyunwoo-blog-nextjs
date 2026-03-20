import { Github } from 'lucide-react'
import Link from 'next/link'
import DesktopMenu from '@/components/features/navigation/desktop-menu'
import MobileMenu from '@/components/features/navigation/mobile-menu'
import ThemeSwitch from '@/components/features/theme-switch'
import { InnerContainer } from '@/components/layout/inner-container'
import { IconButton } from '@/components/ui/button'
import { MENU_ITEMS } from '@/lib/constants'
import { getCategoriesWithTags } from '@/services/post'
import Logo from '../ui/logo'

export async function Header() {
  const categories = await getCategoriesWithTags()

  return (
    <header className="fixed w-full border-b backdrop-blur-xl bg-background/50 z-10">
      <InnerContainer className="h-12 flex items-center justify-between">
        {/* 데스크톱 화면에서만 보이는 제목 */}
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>

        {/* 모바일 메뉴 */}
        <MobileMenu menuItems={MENU_ITEMS} categories={categories} />

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
  )
}
