import { getPostBySlug, getPublishedPosts } from "@/services/post";
import { notFound } from "next/navigation";
import { InnerContainer } from "@/components/layout/inner-container";
import { PostBody } from "@/components/features/blog/post-body";
import { PostHead } from "@/components/features/blog/post-head";
import { PostFooter } from "@/components/features/blog/post-footer";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.meta.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <InnerContainer>
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <article className="prose dark:prose-invert mx-auto tracking-wide leading-relaxed">
          <PostHead post={post} />
          <PostBody post={post} />
          <PostFooter post={post} />
        </article>
      </div>
    </InnerContainer>
  );
}
