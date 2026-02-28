"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A bar chart";

const defaultChartData = [
  { month: "January", direct: 186, organic: 140, social: 95 },
  { month: "February", direct: 305, organic: 210, social: 150 },
  { month: "March", direct: 237, organic: 180, social: 120 },
  { month: "April", direct: 73, organic: 95, social: 60 },
  { month: "May", direct: 209, organic: 160, social: 110 },
  { month: "June", direct: 214, organic: 175, social: 125 },
];

const chartConfig = {
  direct: {
    label: "Direct",
    color: "var(--destructive)",
  },
  organic: {
    label: "Organic",
    color: "var(--primary)",
  },
  social: {
    label: "Social",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function Traffic({
  data,
  isLoading,
}: {
  data?: { month: string; direct: number; organic: number; social: number }[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const chartData = data || defaultChartData;
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
            <stop
              offset="0%"
              stopColor="var(--destructive)"
              stopOpacity={0.2}
            />
            <stop
              offset="100%"
              stopColor="var(--destructive)"
              stopOpacity={1}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="direct" fill="var(--destructive)" radius={8} />
        <Bar dataKey="organic" fill="var(--primary)" radius={8} />
        <Bar dataKey="social" fill="var(--chart-2)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
