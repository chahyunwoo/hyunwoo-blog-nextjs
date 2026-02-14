import { getPostBySlug, getPublishedPosts } from "@/services/post";
import { notFound } from "next/navigation";
import { InnerContainer } from "@/components/layout/inner-container";
import { PostBody } from "@/components/features/blog/post-body";
import { PostHead } from "@/components/features/blog/post-head";
import { PostFooter } from "@/components/features/blog/post-footer";
import type { Params } from "@/types";
import type { Metadata } from "next";

const BASE_URL = "https://chahyunwoo.dev";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.meta.slug,
  }));
}

export async function generateMetadata({
  params,
}: Params<{ slug: string }>): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  const { title, description, thumbnail, tags, date } = post.meta;
  const url = `${BASE_URL}/blog/${slug}`;

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: "Hyunwoo Cha", url: BASE_URL }],
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url,
      title,
      description,
      siteName: "hyunwoo.dev",
      publishedTime: date,
      authors: ["Hyunwoo Cha"],
      tags,
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnail],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function Page({ params }: Params<{ slug: string }>) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.meta.title,
      description: post.meta.description,
      image: `${BASE_URL}${post.meta.thumbnail}`,
      datePublished: post.meta.date,
      dateModified: post.meta.date,
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blog/${slug}`,
      },
      keywords: post.meta.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: post.meta.mainTag,
          item: `${BASE_URL}/?category=${post.meta.mainTag}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.meta.title,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InnerContainer>
        <div className="container max-w-2xl mx-auto py-8">
          <article className="prose dark:prose-invert mx-auto tracking-wide leading-relaxed">
            <PostHead post={post} />
            <PostBody post={post} />
            <PostFooter post={post} />
          </article>
        </div>
      </InnerContainer>
    </>
  );
}
