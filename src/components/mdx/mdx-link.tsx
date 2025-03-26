"use client";

import Link from "next/link";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MdxLinkProps {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export function MdxLink({
  href,
  children,
  showIcon = true,
  className,
  ...props
}: MdxLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal =
    href.startsWith("http") || href.startsWith("//") || href.startsWith("www.");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="anchor"
        {...props}
      >
        <span className="items-center">
          {children}
          {showIcon && (
            <ExternalLinkIcon className="h-3 w-3 inline-block ml-0.5" />
          )}
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className="anchor" {...props}>
      {children}
    </Link>
  );
}
