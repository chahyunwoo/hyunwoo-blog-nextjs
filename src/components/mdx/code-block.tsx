"use client";

import { Check, Copy } from "lucide-react";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconButton } from "../common/button";
import { cn } from "@/lib/utils";
export function CodeBlock({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(async () => {
    const code = preRef.current?.textContent;

    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (error) {
      console.error("클립보드에 복사하는 데 실패했습니다:", error);
    }
  }, []);

  useEffect(() => {
    if (copied) {
      const iconTimer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(iconTimer);
    }
  }, [copied]);

  return (
    <div className="relative">
      <IconButton
        variant="ghost"
        icon={copied ? Check : Copy}
        className={`absolute right-2 top-2 ${
          copied ? "text-green-500 hover:text-green-500" : ""
        }`}
        onClick={handleCopy}
        disabled={copied}
        aria-label={copied ? "코드가 복사됨" : "코드 복사하기"}
      />
      <pre {...props} className={cn(className)} ref={preRef}>
        {children}
      </pre>
    </div>
  );
}
