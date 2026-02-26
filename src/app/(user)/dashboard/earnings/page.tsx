"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Banknote, ClockIcon, DollarSign, WalletIcon } from "lucide-react";
import { PieDonut } from "./piedonut";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PayoutsDashboard } from "./payout";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import type { EarningsResponse } from "./types";

const money = (amount: number | string, currency = "USD") => {
  const safeAmount = typeof amount === "string" ? Number(amount) : amount;
  const parsed = Number.isFinite(safeAmount) ? safeAmount : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(parsed);
};

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["earnings"],
    queryFn: async (): Promise<EarningsResponse> => {
      return await howl("/creator/earnings", { token });
    },
  });

  const earnings = data?.data;
  const currency = earnings?.wallet?.currency || "USD";

  const chartTotal =
    (earnings?.total_paid_this_month ?? 0) +
    (earnings?.total_paid_previous_months ?? 0) +
    (earnings?.pending_payouts_amount ?? 0);

  const thisMonthPct = chartTotal
    ? Math.round(((earnings?.total_paid_this_month ?? 0) / chartTotal) * 100)
    : 0;
  const previousMonthPct = chartTotal
    ? Math.round(
        ((earnings?.total_paid_previous_months ?? 0) / chartTotal) * 100,
      )
    : 0;
  const pendingPct = chartTotal
    ? Math.round(((earnings?.pending_payouts_amount ?? 0) / chartTotal) * 100)
    : 0;

  const stats = [
    {
      title: "Pending Earnings",
      value: money(earnings?.pending_payouts_amount ?? 0, currency),
      icon: ClockIcon,
    },
    {
      title: "Paid Out",
      value: money(earnings?.total_paid_amounts ?? 0, currency),
      icon: Banknote,
    },
    {
      title: "Available Balance",
      value: money(earnings?.wallet?.balance ?? 0, currency),
      icon: WalletIcon,
    },
    {
      title: "Monthly Payout Percentage Change",
      value: `${earnings?.monthly_payout_percentage_change ?? 0}%`,
      icon: DollarSign,
    },
  ];

  return (
    <main className="flex flex-col justify-start items-start gap-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon }, i) => (
          <Card key={i} className="rounded-none">
            <CardHeader className="justify-between w-full flex items-start">
              <CardTitle>{title}</CardTitle>
              <Icon className="text-primary" />
            </CardHeader>
            <CardContent className="text-4xl">{value}</CardContent>
            <CardFooter />
          </Card>
        ))}
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl italic text-primary">
            Commission Breakdown
          </CardTitle>
          <CardContent className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p>This Month Paid ({thisMonthPct}%)</p>
              <Progress className="h-3" value={thisMonthPct} />
              <p>Previous Months Paid ({previousMonthPct}%)</p>
              <Progress className="h-3" value={previousMonthPct} />
              <p>Pending Payouts ({pendingPct}%)</p>
              <Progress className="h-3" value={pendingPct} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <PieDonut
                data={[
                  {
                    key: "this_month",
                    label: "This Month Paid",
                    value: earnings?.total_paid_this_month ?? 0,
                  },
                  {
                    key: "previous_months",
                    label: "Previous Months Paid",
                    value: earnings?.total_paid_previous_months ?? 0,
                  },
                  {
                    key: "pending",
                    label: "Pending Payouts",
                    value: earnings?.pending_payouts_amount ?? 0,
                  },
                ]}
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-primary rounded-full" />
                  This Month Paid
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-purple-500 rounded-full" />
                  Previous Months Paid
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-green-500 rounded-full" />
                  Pending Payouts
                </div>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl italic text-primary">
            Recent Transaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earnings?.products?.length ? (
                earnings.products.map((prod, index) => (
                  <TableRow key={`${prod.product_code}-${index}`}>
                    <TableCell>{prod.product_code}</TableCell>
                    <TableCell className="flex gap-2 items-center">
                      <Image
                        src={prod.main_image || "/image/product.jpeg"}
                        height={64}
                        width={124}
                        alt={prod.title}
                        unoptimized
                        className="w-16 aspect-square object-cover rounded-lg"
                      />
                      <span className="line-clamp-2">{prod.title}</span>
                    </TableCell>
                    <TableCell>{prod.total_clicks}</TableCell>
                    <TableCell>{prod.total_conversions}</TableCell>
                    <TableCell>
                      {money(prod.total_earnings, currency)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          prod.id
                            ? "bg-green-200 text-green-800"
                            : "bg-zinc-200 text-zinc-800"
                        }
                      >
                        {prod.id ? "Listed" : "Unlisted"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    {isPending
                      ? "Loading earnings..."
                      : "No product earnings yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {!isPending && earnings && <PayoutsDashboard data={earnings} />}
    </main>
  );
}
