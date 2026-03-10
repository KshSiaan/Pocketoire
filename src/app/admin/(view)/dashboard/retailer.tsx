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
  { retailer: "eBay", sales: 187, fill: "var(--color-destructive)" },
  { retailer: "Walmart", sales: 173, fill: "var(--color-primary)" },
  { retailer: "Other", sales: 90, fill: "var(--color-destructive)" },
];

const chartConfig = {
  sales: {
    label: "Sales",
  },
  amazon: {
    label: "Amazon",
    color: "var(--color-destructive)",
  },
  shopify: {
    label: "Shopify",
    color: "var(--color-primary)",
  },
  ebay: {
    label: "eBay",
    color: "var(--color-destructive)",
  },
  walmart: {
    label: "Walmart",
    color: "var(--color-primary)",
  },
  other: {
    label: "Other",
    color: "var(--color-destructive)",
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

  const chartData = data?.length ? data : defaultChartData;
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
