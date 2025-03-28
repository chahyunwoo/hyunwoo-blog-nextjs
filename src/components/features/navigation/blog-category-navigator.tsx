"use client";

import React, { useCallback, useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CategoryData } from "@/types";
import { getCategoryStyle } from "@/styles/styles";
interface BlogCategoryNavigatorProps {
  categories: CategoryData[];
  variant: "menu" | "sidebar";
  menuName?: string;
  closeMenu?: () => void;
}

export function BlogCategoryNavigator({
  categories,
  variant,
  menuName = "Categories",
  closeMenu = () => {},
}: BlogCategoryNavigatorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isBlogActive = pathname === "/" || pathname.startsWith("/blog/");

  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(categories.map((cat) => cat.category))
  );

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";
  const activeParentCategory = searchParams.get("parentCategory") || "";

  const totalPostCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.postCount, 0);
  }, [categories]);

  const toggleCategory = useCallback(
    (category: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setOpenCategories((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(category)) {
          newSet.delete(category);
        } else {
          newSet.add(category);
        }
        return newSet;
      });
    },
    []
  );

  const navigateTo = useCallback(
    (params: Record<string, string> = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.set(key, value);
      });

      const queryString = searchParams.toString();
      const path = queryString
        ? `${variant === "menu" ? "/?" : "?"}${queryString}`
        : "/";
      router.push(path);

      if (variant === "menu") {
        closeMenu();
      }
    },
    [router, closeMenu, variant]
  );

  const handleCategoryClick = useCallback(
    (category: string) => {
      if (category === activeCategory) return;
      navigateTo({ category });
    },
    [activeCategory, navigateTo]
  );

  const handleTagClick = useCallback(
    (tag: string, parentCategory: string) => {
      if (tag === activeTag && parentCategory === activeParentCategory) return;
      navigateTo({ tag, parentCategory });
    },
    [activeTag, activeParentCategory, navigateTo]
  );

  const handleAllClick = useCallback(() => {
    navigateTo();
  }, [navigateTo]);

  const renderCategoriesContent = () => (
    <div className="space-y-1">
      <button
        onClick={handleAllClick}
        className={getCategoryStyle(
          variant,
          true,
          false,
          pathname,
          activeCategory,
          activeTag
        )}
      >
        <span>ALL</span>
        <span className="text-xs text-muted-foreground">{totalPostCount}</span>
      </button>

      {categories.map((item) => (
        <Collapsible
          key={item.category}
          open={openCategories.has(item.category)}
          className="w-full"
        >
          <div className="flex w-full">
            <div
              onClick={() => handleCategoryClick(item.category)}
              className={getCategoryStyle(
                variant,
                false,
                activeCategory === item.category,
                pathname,
                activeCategory,
                activeTag
              )}
            >
              <div className="flex items-center gap-2">
                <span>{item.category}</span>
                {item.recent && (
                  <Badge
                    variant="outline"
                    className="text-[10px] h-4 px-1 text-red-500 border-none"
                  >
                    N
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {item.postCount}
                </span>

                <button
                  onClick={(e) => toggleCategory(item.category, e)}
                  className="focus:outline-none cursor-pointer ml-2"
                >
                  {openCategories.has(item.category) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <CollapsibleContent className="pt-1 space-y-1">
            {item.subCategory.map((subItem) => {
              const isActive =
                activeTag === subItem.name &&
                activeParentCategory === item.category;

              return (
                <button
                  key={subItem.name}
                  onClick={() => handleTagClick(subItem.name, item.category)}
                  className={`flex justify-between items-center py-1 text-sm w-full text-left cursor-pointer pl-8 pr-4 ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent/30"
                  }`}
                >
                  <span>{subItem.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {subItem.count}
                  </span>
                </button>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );

  if (variant === "menu") {
    return (
      <Collapsible
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        className="w-full"
      >
        <CollapsibleTrigger
          className={`flex justify-between items-center w-full px-4 py-2  ${
            isBlogActive
              ? "text-primary bg-primary/20"
              : "text-muted-foreground"
          }`}
        >
          <span>{menuName}</span>
          {isMenuOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-1 mt-1">
          {renderCategoriesContent()}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <aside className="w-full max-w-[200px] border-r pt-6 pb-12 hidden md:block">
      <nav className="space-y-6">{renderCategoriesContent()}</nav>
    </aside>
  );
}
