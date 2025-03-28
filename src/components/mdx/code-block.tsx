"use client";

import { DetailedHTMLProps, HTMLAttributes, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import CopyButton from "../common/copy-button";
export function CodeBlock({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);

  const getCodeContent = useCallback(() => {
    return preRef.current?.textContent || "";
  }, []);

  return (
    <div className="relative">
      <CopyButton
        icon="Copy"
        className="absolute right-2 top-2 backdrop-blur-xl"
        alert={false}
        getContent={getCodeContent}
      />
      <pre {...props} className={cn(className)} ref={preRef}>
        {children}
      </pre>
    </div>
  );
}
