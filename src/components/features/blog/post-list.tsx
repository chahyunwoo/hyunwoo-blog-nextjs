import Link from 'next/link'
import { getPublishedPosts } from '@/services/post'
import type { Post } from '@/types'
import { PostCard } from './post-card'

interface PostListProps {
  posts: Post[]
}

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
  }

  return <PostList posts={filteredPosts} />
}

function PostList({ posts }: PostListProps) {
  return (
    <div className="w-full">
      {posts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link href={`/blog/${post.meta.slug}`} key={post.meta.slug} className="block" prefetch={index < 4}>
              <PostCard key={post.meta.slug} post={post} index={index} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
