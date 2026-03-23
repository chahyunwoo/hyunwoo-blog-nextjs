import { Github } from 'lucide-react'
import Link from 'next/link'
import { getCategoriesWithTags } from '@/entities/post'
import { DesktopMenu, MobileMenu } from '@/features/navigation'
import { SearchCommand } from '@/features/search'
import { ThemeSwitch } from '@/features/theme'
import { MENU_ITEMS } from '@/shared/config'
import { IconButton, InnerContainer, Logo } from '@/shared/ui'

export async function Header() {
  const categories = await getCategoriesWithTags().catch(() => [])

  return (
    <header className="fixed w-full z-10 border-b backdrop-blur-xl bg-background/80">
      <InnerContainer className="h-14 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <MobileMenu menuItems={MENU_ITEMS} categories={categories} />
          <Link href="/" className="hidden md:block">
            <Logo />
          </Link>
        </div>

        <div className="flex justify-center">
          <DesktopMenu items={MENU_ITEMS} />
        </div>

        <div className="flex items-center justify-end gap-1">
          <SearchCommand />
          <IconButton
            icon={Github}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            href="https://github.com/chahyunwoo"
            aria-label="GitHub"
          />
          <ThemeSwitch />
        </div>
      </InnerContainer>
    </header>
  )
}
