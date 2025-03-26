"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ActiveLinkProps {
  href: string;
  title: string;
  className?: string;
  onClick?: () => void;
}

export default function ActiveLink({
  href,
  title,
  className,
  onClick,
}: ActiveLinkProps) {
  const pathname = usePathname()!;
  const isActive =
    pathname === href ||
    (href === "/" && pathname.startsWith("/blog/")) ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(className, isActive && "text-primary")}
      onClick={onClick}
    >
      {title}
    </Link>
  );
}
