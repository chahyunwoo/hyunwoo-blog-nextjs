import Link from 'next/link'
import { BlogCategoryNavigator } from '@/components/features/navigation/blog-category-navigator'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { getCategoriesWithTags, getPublishedPosts } from '@/services/post'
import { SidebarTagCloud } from './sidebar-tag-cloud'

const RECENT_POST_COUNT = 5

function getAllTags(categories: Awaited<ReturnType<typeof getCategoriesWithTags>>) {
  const tagMap = new Map<string, number>()
  for (const cat of categories) {
    for (const sub of cat.subCategory) {
      tagMap.set(sub.name, (tagMap.get(sub.name) || 0) + sub.count)
    }
  }
  const sorted = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1])
  return { tags: sorted.slice(0, 15), totalCount: sorted.length }
}

export async function BlogSidebar() {
  const [categories, posts] = await Promise.all([getCategoriesWithTags(), getPublishedPosts()])

  const recentPosts = posts.slice(0, RECENT_POST_COUNT)
  const { tags: topTags, totalCount: totalTagCount } = getAllTags(categories)

  return (
    <aside className="w-full max-w-[240px] border-r pt-6 pb-12 hidden md:flex md:flex-col gap-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <BlogCategoryNavigator categories={categories} variant="sidebar" />

      <hr className="border-border mx-3" />

      <SidebarTagCloud tags={topTags} totalCount={totalTagCount} />

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
