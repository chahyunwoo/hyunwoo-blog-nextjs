"use client";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const isActive = pathname === href;

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
