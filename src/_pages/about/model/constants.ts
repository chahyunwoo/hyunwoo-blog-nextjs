import { ChartConfig } from "@/shared/ui/components/chart";

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
