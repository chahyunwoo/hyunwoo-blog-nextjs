"use client";

import React, { useEffect, useState } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/common/collapsible";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Badge } from "@/components/common/badge";
import { ScrollArea } from "@/components/common/scroll-area";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function PostTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [_, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const style = document.createElement("style");
    style.innerHTML = `
      h1, h2, h3, h4, h5, h6 {
        scroll-margin-top: 100px;
      }
    `;
    document.head.appendChild(style);

    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    const headingData = headingElements
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      }))
      .filter((_, index) => index !== 0);

    setHeadings(headingData);

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

    headingElements.slice(1).forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      document.documentElement.style.scrollBehavior = "";
      document.head.removeChild(style);

      headingElements.slice(1).forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

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
              <nav>
                <ul className="space-y-1 text-sm">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className="pl-3 transition-all duration-200 py-1"
                    >
                      <a
                        href={`#${heading.id}`}
                        onClick={(e) => handleLinkClick(e, heading.id)}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </ScrollArea>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
