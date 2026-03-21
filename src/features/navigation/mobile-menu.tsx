'use client'

import { AlertCircle, Menu } from 'lucide-react'
import { Suspense, useCallback, useState } from 'react'
import ActiveLink from '@/entities/category/ui/active-link'
import { BlogCategoryNavigator } from '@/entities/category/ui/blog-category-navigator'
import type { CategoryData, MenuItem } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import Logo from '@/shared/ui/logo'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { BlogMenuSkeleton } from '@/shared/ui/skeletons'

interface MobileMenuProps {
  menuItems: MenuItem[]
  categories: CategoryData[]
}

export default function MobileMenu({ menuItems, categories = [] }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[340px] overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="px-2">
            <Logo />
          </SheetTitle>
          <SheetDescription className="hidden">Navigate to different sections of the site.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          <nav className="flex flex-col">
            {menuItems.map(({ name, href }) => {
              const isBlogMenu = name.toLowerCase().includes('blog')

              if (isBlogMenu) {
                if (categories.length === 0) {
                  return (
                    <div key={name} className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 opacity-40" />
                      카테고리를 불러올 수 없습니다
                    </div>
                  )
                }
                return (
                  <Suspense key={name} fallback={<BlogMenuSkeleton />}>
                    <BlogCategoryNavigator categories={categories} variant="menu" closeMenu={onClose} />
                  </Suspense>
                )
              }

              return <ActiveLink key={name} href={href} title={name} className="px-4 py-2" onClick={onClose} />
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
