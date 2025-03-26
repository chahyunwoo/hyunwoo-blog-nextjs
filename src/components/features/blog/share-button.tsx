"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, Share2 } from "lucide-react";
import { IconButton } from "@/components/common/button";
import { Alert, AlertDescription } from "@/components/common/alert";

interface ShareButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ShareButton({
  variant = "ghost",
  size = "icon",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      // 현재 페이지 URL 복사
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setShowAlert(true);
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

  useEffect(() => {
    if (showAlert) {
      const alertTimer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(alertTimer);
    }
  }, [showAlert]);

  return (
    <>
      <IconButton
        variant={variant}
        size={size}
        icon={copied ? Check : Share2}
        className={`cursor-pointer transition-all ${className} ${
          copied ? "text-green-500 hover:text-green-500" : ""
        }`}
        onClick={handleCopyLink}
        disabled={copied}
        aria-label={copied ? "링크가 복사됨" : "링크 복사하기"}
      />

      {showAlert && (
        <Alert
          className="fixed bottom-4 right-1/2 transform translate-x-1/2 w-auto bg-background shadow-lg border max-w-xs animate-in fade-in slide-in-from-bottom-5 z-50"
          variant="default"
        >
          <AlertDescription className="flex items-center gap-2 min-w-45 justify-center py-2">
            <Check className="h-4 w-4 text-green-500" />
            링크가 클립보드에 복사되었습니다!
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
