import { InnerContainer } from "@/components/layout/inner-container";
import { getCategoriesWithTags } from "@/services/post";
import { Suspense } from "react";
import { BlogSidebarSkeleton } from "@/components/skeleton/blog-sidebar-skeleton";
import { BlogCategoryNavigator } from "../features/navigation/blog-category-navigator";

interface BlogLayoutProps {
  children: React.ReactNode;
}

async function BlogSidebarContainer() {
  const categories = await getCategoriesWithTags();

  return <BlogCategoryNavigator categories={categories} variant="sidebar" />;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <InnerContainer className="flex flex-col md:flex-row md:!pl-0">
      <Suspense fallback={<BlogSidebarSkeleton count={6} />}>
        <BlogSidebarContainer />
      </Suspense>
      <div className="flex-1 pt-6 pb-12 space-y-8 md:pl-8">{children}</div>
    </InnerContainer>
  );
}
