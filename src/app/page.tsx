import { Suspense } from "react";
import { PostSkeleton } from "@/components/skeleton/post-skeleton";
import { PostListContainer } from "@/components/features/blog/post-list";
import { Metadata } from "next";
import { getCategoriesWithTags } from "@/services/post";
import { BlogLayout } from "@/components/layout/blog-layout";

export type BlogParams = Promise<{
  category?: string;
  tag?: string;
  parentCategory?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BlogParams;
}): Promise<Metadata> {
  const { category, tag, parentCategory } = await searchParams;

  let title = "hyunwoo.dev";
  let description = "최신 기술 관련 글과 경험을 공유합니다.";

  if (category) {
    title = `hyunwoo.dev | ${category}`;
    description = `${category} 카테고리의 모든 포스트입니다.`;
  } else if (tag && parentCategory) {
    title = `hyunwoo.dev | ${parentCategory} > ${tag}`;
    description = `${parentCategory} 카테고리의 ${tag} 태그 포스트입니다.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: BlogParams;
}) {
  const { category, tag, parentCategory } = await searchParams;

  return (
    <BlogLayout>
      <Suspense fallback={<PostSkeleton count={6} />}>
        <PostListContainer
          category={category}
          tag={tag}
          parentCategory={parentCategory}
        />
      </Suspense>
    </BlogLayout>
  );
}
