"use client";

import AboutContainer from "./layout/about-container";
import { CHART_CONFIG, SKILLS_DATA } from "../model/constants";
import { Card, CardContent } from "@/shared/ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/components/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

export default function Skills() {
  return (
    <AboutContainer title="SKILLS">
      <Card className="bg-background">
        <CardContent className="pb-0">
          <ChartContainer
            config={CHART_CONFIG}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={SKILLS_DATA}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="skill" />
              <PolarGrid />
              <Radar
                dataKey="level"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </AboutContainer>
  );
}
