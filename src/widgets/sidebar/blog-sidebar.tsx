import Link from 'next/link'
import { BlogCategoryNavigator } from '@/entities/category/ui/blog-category-navigator'
import { SidebarTagCloud } from '@/entities/category/ui/sidebar-tag-cloud'
import { getCategoriesWithTags, getRecentPosts, getTagCloud } from '@/entities/post/api/post-api'
import { formatDate } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'

export async function BlogSidebar() {
  const [categories, recentPosts, tagData] = await Promise.all([
    getCategoriesWithTags(),
    getRecentPosts(5),
    getTagCloud(15),
  ])

  return (
    <aside className="w-full max-w-[240px] border-r pt-6 pb-12 pr-4 hidden md:flex md:flex-col gap-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <BlogCategoryNavigator categories={categories} variant="sidebar" />

      <hr className="border-border mx-3" />

      <SidebarTagCloud tags={tagData.tags.map(t => [t.name, t.count] as [string, number])} totalCount={tagData.total} />

      <hr className="border-border mx-3" />

      <nav>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Recent</p>
        <div className="space-y-1">
          {recentPosts.map(post => (
            <Link
              key={post.meta.slug}
              href={`/blog/${post.meta.slug}`}
              className="block px-3 py-2 rounded-md hover:bg-accent transition-colors group"
              title={post.meta.title}
            >
              <p className="text-sm text-foreground group-hover:text-primary transition-colors truncate leading-tight">
                {post.meta.title}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                  {post.meta.mainTag}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{formatDate(post.meta.date)}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}
