import { InnerContainer } from "@/components/layout/inner-container";
import type { CategoryData } from "@/types";
import { BlogSidebar } from "@/components/features/blog/blog-sidebar";
import { BlogParams } from "@/app/page";
import { getCategoriesWithTags } from "@/services/post";
import { Suspense } from "react";
import { BlogSidebarSkeleton } from "@/components/skeleton/blog-sidebar-skeleton";

interface BlogLayoutProps {
  children: React.ReactNode;
}

async function BlogSidebarContainer() {
  const categories = await getCategoriesWithTags();

  return <BlogSidebar categories={categories} />;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <InnerContainer className="flex flex-col md:flex-row">
      <Suspense fallback={<BlogSidebarSkeleton count={6} />}>
        <BlogSidebarContainer />
      </Suspense>
      <div className="flex-1 pt-6 pb-12 space-y-8 md:pl-8">{children}</div>
    </InnerContainer>
  );
}
