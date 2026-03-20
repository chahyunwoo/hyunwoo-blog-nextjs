import { Github } from 'lucide-react'
import Link from 'next/link'
import DesktopMenu from '@/components/features/navigation/desktop-menu'
import MobileMenu from '@/components/features/navigation/mobile-menu'
import { SearchCommand } from '@/components/features/search/search-command'
import ThemeSwitch from '@/components/features/theme-switch'
import { InnerContainer } from '@/components/layout/inner-container'
import { IconButton } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import { MENU_ITEMS } from '@/lib/constants'
import { getCategoriesWithTags, getPublishedPosts } from '@/services/post'

export async function Header() {
  const [categories, posts] = await Promise.all([getCategoriesWithTags(), getPublishedPosts()])

  const postMetas = posts.map(p => p.meta)

  return (
    <header className="fixed w-full z-10 border-b backdrop-blur-xl bg-background/80">
      <InnerContainer className="h-14 flex items-center justify-between">
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>

        <MobileMenu menuItems={MENU_ITEMS} categories={categories} />
        <DesktopMenu items={MENU_ITEMS} />

        <div className="flex items-center gap-1">
          <SearchCommand posts={postMetas} />
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
