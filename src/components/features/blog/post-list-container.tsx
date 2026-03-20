import { getPublishedPosts } from '@/services/post'
import { PostList } from './post-list'

export async function PostListContainer({
  category,
  tag,
  parentCategory,
}: {
  category?: string
  tag?: string
  parentCategory?: string
}) {
  const allPosts = await getPublishedPosts()

  let filteredPosts = allPosts

  if (category) {
    filteredPosts = allPosts.filter(post => post.meta.mainTag === category)
  } else if (tag && parentCategory) {
    filteredPosts = allPosts.filter(post => post.meta.tags.includes(tag) && post.meta.mainTag === parentCategory)
  } else if (tag) {
    filteredPosts = allPosts.filter(post => post.meta.tags.includes(tag))
  }

  return <PostList posts={filteredPosts} />
}
