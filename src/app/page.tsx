import { Suspense } from "react";
import { PostSkeleton } from "@/components/skeleton/post-skeleton";
import { PostListContainer } from "@/components/features/blog/post-list";
import { Metadata } from "next";
import { BlogLayout } from "@/components/layout/blog-layout";
import { BlogParams } from "@/types";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BlogParams;
}): Promise<Metadata> {
  const { category, tag, parentCategory } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  let title = "hyunwoo.dev";
  let description = "최신 기술 관련 글과 경험을 공유합니다.";
  let keywords = "개발, 프로그래밍, 기술, 블로그, 웹개발";

  if (category) {
    title = `hyunwoo.dev | ${category}`;
    description = `${category} 카테고리의 모든 포스트입니다.`;
    keywords = `${category}, 개발, 프로그래밍, 기술, 블로그, 웹개발`;
  } else if (tag && parentCategory) {
    title = `hyunwoo.dev | ${parentCategory} > ${tag}`;
    description = `${parentCategory} 카테고리의 ${tag} 태그 포스트입니다.`;
    keywords = `${parentCategory}, ${tag}, 개발, 프로그래밍, 기술, 블로그, 웹개발`;
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${baseUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: "hyunwoo.dev",
        },
      ],
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
