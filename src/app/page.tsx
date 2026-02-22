import { Suspense } from "react";
import { PostSkeleton } from "@/components/skeleton/post-skeleton";
import { PostListContainer } from "@/components/features/blog/post-list";
import { Metadata } from "next";
import { BlogLayout } from "@/components/layout/blog-layout";
import { BlogParams } from "@/types";

const BASE_URL = "https://chahyunwoo.dev";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BlogParams;
}): Promise<Metadata> {
  const { category, tag, parentCategory } = await searchParams;

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
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: "hyunwoo.dev",
        },
      ],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "hyunwoo.dev",
  url: BASE_URL,
  description:
    "프론트엔드 개발자 현우의 기술 블로그입니다. React, Next.js, TypeScript 등 웹 개발 경험과 노하우를 공유합니다.",
  author: {
    "@type": "Person",
    name: "Hyunwoo Cha",
    url: BASE_URL,
  },
  publisher: {
    "@type": "Person",
    name: "Hyunwoo Cha",
    url: BASE_URL,
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: BlogParams;
}) {
  const { category, tag, parentCategory } = await searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogLayout>
        <Suspense fallback={<PostSkeleton count={6} />}>
          <PostListContainer
            category={category}
            tag={tag}
            parentCategory={parentCategory}
          />
        </Suspense>
      </BlogLayout>
    </>
  );
}
