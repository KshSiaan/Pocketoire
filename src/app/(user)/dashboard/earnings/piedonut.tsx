"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartConfig = {
  amount: {
    label: "Amount",
  },
  this_month: {
    label: "This Month Paid",
    color: "var(--chart-1)",
  },
  previous_months: {
    label: "Previous Months Paid",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending Payouts",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PieDonut({
  data,
}: {
  data: Array<{
    key: "this_month" | "previous_months" | "pending";
    label: string;
    value: number;
  }>;
}) {
  const chartData = data.map((item) => ({
    name: item.label,
    amount: item.value,
    fill: `var(--color-${item.key})`,
  }));

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
          dataKey="amount"
          nameKey="name"
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  );
}
