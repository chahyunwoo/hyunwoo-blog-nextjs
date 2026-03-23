import { Suspense } from 'react'
import { BlogSidebarSkeleton, InnerContainer } from '@/shared/ui'
import { BlogSidebar } from './blog-sidebar'

interface BlogLayoutProps {
  children: React.ReactNode
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <InnerContainer className="flex flex-col md:flex-row md:pl-0!">
      <Suspense fallback={<BlogSidebarSkeleton />}>
        <BlogSidebar />
      </Suspense>
      <div className="flex-1 pt-6 pb-12 space-y-6 md:pl-8">{children}</div>
    </InnerContainer>
  )
}
