"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A donut chart";

const defaultChartData = [
  { retailer: "Amazon", sales: 275, fill: "var(--color-destructive)" },
  { retailer: "Shopify", sales: 200, fill: "var(--color-primary)" },
  { retailer: "eBay", sales: 187, fill: "var(--color-pink-500)" },
  { retailer: "Walmart", sales: 173, fill: "var(--color-purple-500)" },
  { retailer: "Other", sales: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  sales: {
    label: "Sales",
  },
  amazon: {
    label: "Amazon",
    color: "var(--chart-1)",
  },
  shopify: {
    label: "Shopify",
    color: "var(--chart-2)",
  },
  ebay: {
    label: "eBay",
    color: "var(--chart-3)",
  },
  walmart: {
    label: "Walmart",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function Retailer({
  data,
  isLoading,
}: {
  data?: { retailer: string; sales: number; fill: string }[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <Skeleton className="mx-auto aspect-square max-h-[250px]" />;
  }

  const chartData = data || defaultChartData;
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="sales"
          nameKey="retailer"
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  );
}
