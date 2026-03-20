import { Suspense } from 'react'
import { BlogSidebar } from '@/components/features/blog/blog-sidebar'
import { InnerContainer } from '@/components/layout/inner-container'
import { BlogSidebarSkeleton } from '@/components/skeleton/blog-sidebar-skeleton'

interface BlogLayoutProps {
  children: React.ReactNode
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <InnerContainer className="flex flex-col md:flex-row md:pl-0!">
      <Suspense fallback={<BlogSidebarSkeleton count={6} />}>
        <BlogSidebar />
      </Suspense>
      <div className="flex-1 pt-6 pb-12 space-y-6 md:pl-8">{children}</div>
    </InnerContainer>
  )
}
