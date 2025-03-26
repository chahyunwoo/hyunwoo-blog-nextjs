import { PostCard } from "./post-card";
import type { Post } from "@/types";
import Link from "next/link";
import { getPublishedPosts } from "@/services/post";
interface PostListProps {
  posts: Post[];
}

export async function PostListContainer({
  category,
  tag,
  parentCategory,
}: {
  category?: string;
  tag?: string;
  parentCategory?: string;
}) {
  const allPosts = await getPublishedPosts();

  let filteredPosts = allPosts;
  let title = "ALL";

  if (category) {
    filteredPosts = allPosts.filter((post) => post.meta.mainTag === category);
    title = `${category}`;
  } else if (tag && parentCategory) {
    filteredPosts = allPosts.filter(
      (post) =>
        post.meta.tags.includes(tag) && post.meta.mainTag === parentCategory
    );
    title = `${parentCategory} > ${tag}`;
  }

  return <PostList posts={filteredPosts} />;
}

function PostList({ posts }: PostListProps) {
  return (
    <div className="w-full">
      {posts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              href={`/blog/${post.meta.slug}`}
              key={post.meta.slug}
              className="block"
            >
              <PostCard key={post.meta.slug} post={post} index={index} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
