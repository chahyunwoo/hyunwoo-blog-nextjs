import { Suspense } from 'react'
import { InnerContainer } from '@/shared/ui/inner-container'
import { BlogSidebarSkeleton } from '@/shared/ui/skeletons'
import { BlogSidebar } from '@/widgets/sidebar/blog-sidebar'

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
