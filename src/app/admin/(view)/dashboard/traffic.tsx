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
  { label: "January", viator: 186, expedia: 140, amazon: 95 },
  { label: "February", viator: 305, expedia: 210, amazon: 150 },
  { label: "March", viator: 237, expedia: 180, amazon: 120 },
  { label: "April", viator: 73, expedia: 95, amazon: 60 },
  { label: "May", viator: 209, expedia: 160, amazon: 110 },
  { label: "June", viator: 214, expedia: 175, amazon: 125 },
];

const CHART_COLORS = [
  "var(--destructive)",
  "var(--primary)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const formatLabel = (value: string): string =>
  value
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export function Traffic({
  data,
  isLoading,
}: {
  data?: Array<{ label: string; [key: string]: number | string }>;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  const chartData = data?.length ? data : defaultChartData;
  const seriesKeys = Object.keys(chartData[0] ?? {}).filter(
    (key) => key !== "label",
  );

  const chartConfig = seriesKeys.reduce(
    (acc, key, index) => {
      acc[key] = {
        label: formatLabel(key),
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
      return acc;
    },
    {
      views: {
        label: "Views",
      },
    } as ChartConfig,
  );

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => String(value).slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {seriesKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={CHART_COLORS[index % CHART_COLORS.length]}
            radius={8}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
