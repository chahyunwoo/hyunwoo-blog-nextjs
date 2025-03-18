"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, Mail } from "lucide-react";
import { IconButton } from "@/shared/ui/components/button";
import { Alert, AlertDescription } from "@/shared/ui/components/alert";

interface EmailButtonProps {
  email: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  copyString: string;
}

export function EmailButton({
  email,
  variant = "outline",
  copyString,
}: EmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setShowAlert(true);
    } catch (error) {
      console.error("클립보드에 복사하는 데 실패했습니다:", error);
    }
  }, [email]);

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
      }, 5000);

      return () => clearTimeout(alertTimer);
    }
  }, [showAlert]);

  return (
    <>
      <IconButton
        variant={variant}
        icon={copied ? Check : Mail}
        className={`cursor-pointer transition-all ${
          copied ? "text-green-500 hover:text-green-500" : ""
        }`}
        onClick={handleCopyEmail}
        disabled={copied}
        aria-label={copied ? "이메일이 복사됨" : "이메일 복사하기"}
      />

      {showAlert && (
        <Alert
          className="fixed bottom-4 right-1/2 transform translate-x-1/2 w-auto bg-background shadow-lg border max-w-xs animate-in fade-in slide-in-from-bottom-5 z-50"
          variant="default"
        >
          <AlertDescription className="flex items-center gap-2 min-w-45 justify-center">
            <Check className="h-4 w-4 text-green-500" />
            {copyString}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
