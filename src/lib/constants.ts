import { ChartConfig } from "@/components/common/chart";
import type { MenuItem } from "@/types";
import path from "path";

// HEADER
export const MENU_ITEMS: MenuItem[] = [
  { name: "Blog", href: "/" },
  { name: "About", href: "/about/ko" },
];

// POSTS
export const POSTS_PATH = path.join(process.cwd(), "src", "posts");
export const RECENT_DAYS = 5;

// ABOUT
export const SKILLS_DATA = [
  { skill: "JavaScript", level: 95 },
  { skill: "React", level: 90 },
  { skill: "RN", level: 55 },
  { skill: "TypeScript", level: 90 },
  { skill: "Vuejs", level: 65 },
  { skill: "Nextjs", level: 85 },
];

export const CHART_CONFIG = {
  desktop: {
    label: "level",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
