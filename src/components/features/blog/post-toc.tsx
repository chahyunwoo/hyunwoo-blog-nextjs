"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function PostTOC({
  skipFirstHeading = true,
}: {
  skipFirstHeading?: boolean;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  const collectHeadings = useCallback(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const headingData = headingElements
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent?.trim() || "",
        level: parseInt(heading.tagName[1]),
      }))
      .filter((_, index) => !skipFirstHeading || index !== 0)
      .filter((heading) => heading.id && heading.text);

    setHeadings(headingData);
    return headingElements;
  }, [skipFirstHeading]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: "smooth",
        });
      }
    },
    []
  );

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const style = document.createElement("style");
    style.innerHTML = `
      h1, h2, h3, h4, h5, h6 {
        scroll-margin-top: 100px;
      }
    `;
    document.head.appendChild(style);

    const headingElements = collectHeadings();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      }
    );

    const elementsToObserve = skipFirstHeading
      ? headingElements.slice(1)
      : headingElements;

    elementsToObserve.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => {
      document.documentElement.style.scrollBehavior = "";
      document.head.removeChild(style);

      elementsToObserve.forEach((heading) => {
        if (heading.id) {
          observer.unobserve(heading);
        }
      });
    };
  }, [collectHeadings, skipFirstHeading]);

  const renderHeadingItems = useMemo(() => {
    return headings.map((heading) => (
      <li
        key={heading.id}
        className={cn(
          "transition-all duration-200 py-1",
          `pl-${Math.max(0, (heading.level - 1) * 2)}`,
          activeId === heading.id ? "text-primary font-medium" : ""
        )}
      >
        <a
          href={`#${heading.id}`}
          onClick={(e) => handleLinkClick(e, heading.id)}
          className="hover:text-primary transition-colors block"
        >
          {heading.text}
        </a>
      </li>
    ));
  }, [headings, activeId, handleLinkClick]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <Card className="my-6 border border-border/40 py-0 rounded-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <CardTitle className="text-lg flex items-center gap-2">
              <List className="h-5 w-5" />
              <span>TABLE</span>
              <Badge variant="outline" className="ml-2 text-xs font-normal">
                {headings.length}개 항목
              </Badge>
            </CardTitle>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                isOpen ? "transform rotate-180" : ""
              )}
            />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <ScrollArea className="max-h-[60vh]">
              <nav aria-label="Table of contents">
                <ul className="space-y-1 text-sm">{renderHeadingItems}</ul>
              </nav>
            </ScrollArea>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
