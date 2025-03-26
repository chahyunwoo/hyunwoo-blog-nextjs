"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/common/select";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { Locale } from "@/types";

const languageMap: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  jp: "日本語",
};

export default function LanguageSwitch() {
  const pathname = usePathname()!;
  const router = useRouter();
  const currentLocale = pathname.split("/")[2] || "ko";

  const handleChange = useCallback(
    (value: string) => {
      router.push(`/about/${value}`);
    },
    [router]
  );

  return (
    <div className="flex items-center gap-2 mb-2">
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <Globe />
          <SelectValue placeholder={languageMap[currentLocale as Locale]} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languageMap).map(([locale, language]) => (
            <SelectItem key={locale} value={locale}>
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
