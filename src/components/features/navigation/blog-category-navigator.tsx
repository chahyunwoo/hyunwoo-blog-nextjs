"use client";

import React, { useCallback, useState, useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CategoryData } from "@/types";
import ActiveLink from "./active-link";
import { usePathname, useSearchParams } from "next/navigation";
import { getParamFromHref } from "@/lib/utils";
import { LINK_TYPES } from "@/lib/constants";
import { LinkType } from "@/types";
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
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(categories.map((cat) => cat.category))
  );
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlParams = useMemo(() => {
    return {
      category: searchParams.get("category") || "",
      tag: searchParams.get("tag") || "",
      parentCategory: searchParams.get("parentCategory") || "",
    };
  }, [searchParams]);

  const totalPostCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.postCount, 0);
  }, [categories]);

  const toggleMenuHandler = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(category) ? newSet.delete(category) : newSet.add(category);
      return newSet;
    });
  }, []);

  const toggleHandlers = useMemo(() => {
    return categories.reduce((handlers, item) => {
      handlers[item.category] = () => toggleCategory(item.category);
      return handlers;
    }, {} as Record<string, () => void>);
  }, [categories, toggleCategory]);

  const checkIsActive = useCallback(
    (href: string, title: string, type: LinkType) => {
      switch (type) {
        case LINK_TYPES.ALL:
          const hasNoParams =
            !urlParams.category && !urlParams.tag && !urlParams.parentCategory;
          return pathname === "/" && hasNoParams;

        case LINK_TYPES.CATEGORY:
          const categoryName = getParamFromHref("category", href);
          return (
            urlParams.category === categoryName ||
            urlParams.parentCategory === title
          );

        case LINK_TYPES.TAG:
          const hrefTag = getParamFromHref("tag", href);
          const hrefParentCategory = getParamFromHref("parentCategory", href);
          return (
            urlParams.tag === hrefTag &&
            urlParams.parentCategory === hrefParentCategory &&
            title === hrefTag
          );

        case LINK_TYPES.DEFAULT:
        default:
          return (
            pathname === href || (href === "/" && pathname.startsWith("/blog/"))
          );
      }
    },
    [pathname, urlParams]
  );

  const renderCategoriesContent = () => (
    <div className="space-y-1">
      <ActiveLink
        href="/"
        title="ALL"
        className="w-full justify-between px-4"
        count={totalPostCount}
        onClick={closeMenu}
        isActive={checkIsActive("/", "ALL", LINK_TYPES.ALL)}
        prefetch={false}
      />

      {categories.map((item) => (
        <Collapsible
          key={item.category}
          open={openCategories.has(item.category)}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <ActiveLink
              href={`/?category=${item.category}`}
              title={item.category}
              className="w-full justify-between px-4"
              count={item.postCount}
              isDropdown={true}
              newBadge={item.recent}
              isOpen={openCategories.has(item.category)}
              onToggleDropdown={toggleHandlers[item.category]}
              onClick={closeMenu}
              isActive={checkIsActive(
                `/?category=${item.category}`,
                item.category,
                LINK_TYPES.CATEGORY
              )}
              prefetch={false}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-1 space-y-1">
            {item.subCategory.map((subItem) => {
              const tagHref = `/?tag=${subItem.name}&parentCategory=${item.category}`;
              return (
                <ActiveLink
                  key={subItem.name}
                  href={tagHref}
                  title={subItem.name}
                  className="w-full justify-between px-4 pl-8"
                  count={subItem.count}
                  onClick={closeMenu}
                  isActive={checkIsActive(
                    tagHref,
                    subItem.name,
                    LINK_TYPES.TAG
                  )}
                  prefetch={false}
                />
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
          asChild
          className={`flex justify-between items-center w-full px-4 py-2`}
        >
          <ActiveLink
            title={menuName}
            href="/"
            isDropdown
            isOpen={isMenuOpen}
            onToggleDropdown={toggleMenuHandler}
            onClick={closeMenu}
            prefetch={false}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-4">
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
