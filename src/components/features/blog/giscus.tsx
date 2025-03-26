"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const $script = document.createElement("script");
    $script.src = "https://giscus.app/client.js";
    $script.async = true;
    $script.setAttribute("data-repo", "chahyunwoo/hyunwoo-blog-nextjs");
    $script.setAttribute("data-repo-id", "R_kgDOOKi_qg");
    $script.setAttribute("data-category", "Announcements");
    $script.setAttribute("data-category-id", "DIC_kwDOOKi_qs4Coeoz");
    $script.setAttribute("data-mapping", "pathname");
    $script.setAttribute("data-strict", "0");
    $script.setAttribute("data-reactions-enabled", "1");
    $script.setAttribute("data-emit-metadata", "0");
    $script.setAttribute("data-input-position", "bottom");
    $script.setAttribute("data-theme", theme);
    $script.setAttribute("data-lang", "ko");

    ref.current.appendChild($script);
  }, [theme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme]);

  return <section ref={ref} />;
}
