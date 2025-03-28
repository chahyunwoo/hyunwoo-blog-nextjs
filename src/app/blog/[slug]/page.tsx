import { getPostBySlug, getPublishedPosts } from "@/services/post";
import { notFound } from "next/navigation";
import { InnerContainer } from "@/components/layout/inner-container";
import { PostBody } from "@/components/features/blog/post-body";
import { PostHead } from "@/components/features/blog/post-head";
import { PostFooter } from "@/components/features/blog/post-footer";
import type { Params } from "@/types";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.meta.slug,
  }));
}

export async function generateMetadata({ params }: Params<{ slug: string }>) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: [post.meta.thumbnail],
    },
  };
}

export default async function Page({ params }: Params<{ slug: string }>) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <InnerContainer>
      <div className="container max-w-2xl mx-auto py-8">
        <article className="prose dark:prose-invert mx-auto tracking-wide leading-relaxed">
          <PostHead post={post} />
          <PostBody post={post} />
          <PostFooter post={post} />
        </article>
      </div>
    </InnerContainer>
  );
}
