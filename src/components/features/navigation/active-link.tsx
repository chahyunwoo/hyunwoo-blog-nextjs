"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface ActiveLinkProps {
  href: string;
  title: string;
  className?: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export default memo(function ActiveLink({
  href,
  title,
  className,
  onClick,
  isMobile = false,
}: ActiveLinkProps) {
  const pathname = usePathname()!;
  const isActive =
    pathname === href ||
    (href === "/" && pathname.startsWith("/blog/")) ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        className,
        isActive && "text-primary",
        isMobile && isActive && "bg-primary/20"
      )}
      onClick={onClick}
    >
      {title}
    </Link>
  );
});
