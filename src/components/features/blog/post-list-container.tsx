import { getPaginatedPosts } from '@/services/post'
import { PostList } from './post-list'

export async function PostListContainer({
  category,
  tag,
  parentCategory,
  page,
}: {
  category?: string
  tag?: string
  parentCategory?: string
  page?: number
}) {
  const result = await getPaginatedPosts({
    page: page || 1,
    limit: 9,
    category: category || parentCategory,
    tag,
  })

  return <PostList posts={result.posts} total={result.total} page={result.page} totalPages={result.totalPages} />
}
