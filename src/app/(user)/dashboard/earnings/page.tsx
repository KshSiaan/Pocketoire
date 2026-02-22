"use client";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ApiResponse } from "@/types/base";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["earnings"],
    queryFn: async (): Promise<
      ApiResponse<{
        total_paid_amounts: number;
        pending_payouts_amount: number;
        total_paid_this_month: number;
        total_paid_previous_months: number;
        monthly_payout_percentage_change: number;
        products: Array<any>;
        wallet: {
          balance: string;
          currency: string;
          status: string;
        };
        payouts: Array<any>;
        last_payout: any;
      }>
    > => {
      return await howl("/creator/earnings", { token });
    },
  });
  const stats = [
    {
      title: "Pending Earnings",
      value: `$${data?.data?.pending_payouts_amount || 0}`,
      icon: ClockIcon,
      change: "+$40 this week",
      changeColor: "text-green-500",
    },
    {
      title: "Paid Out",
      value: `$${data?.data?.total_paid_amounts || 0}`,
      icon: Banknote,
      change: "+$120 this week",
      changeColor: "text-green-500",
    },
    {
      title: "Available Balance",
      value: `$${data?.data?.wallet?.balance || 0}`,
      icon: WalletIcon,
      change: "-$60 this week",
      changeColor: "text-red-500",
    },
    {
      title: "Monthly Payout Percentage Change",
      value: `${data?.data?.monthly_payout_percentage_change || 0}%`,
      icon: DollarSign,
      change: "+$180 this week",
      changeColor: "text-green-500",
    },
  ];

  return (
    <main className="flex flex-col justify-start items-start gap-6">
      {/* <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre> */}
      <div className="w-full grid grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon, change, changeColor }, i) => (
          <Card key={i} className="rounded-none">
            <CardHeader className="justify-between w-full flex items-start">
              <CardTitle>{title}</CardTitle>
              <Icon className="text-primary" />
            </CardHeader>
            <CardContent className="text-4xl">{value}</CardContent>
            <CardFooter>
              {/* <CardDescription className={changeColor}>
                {change}
              </CardDescription> */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl italic text-primary">
            Commission Breakdown
          </CardTitle>
          <CardContent className="w-full grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p>Creator earnings (80%)</p>
              <Progress className="h-3" value={80} />
              <p>Platform Fee (80%)</p>
              <Progress className="h-3" value={80} />
              <p>Processing Fee (80%)</p>
              <Progress className="h-3" value={80} />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <PieDonut />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-primary rounded-full" />
                  Creator earnings
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-purple-500 rounded-full" />
                  Platoform fee
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-green-500 rounded-full" />
                  Processing fee
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
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Oct 22, 2025</TableCell>
                <TableCell className="flex gap-2">
                  <Image
                    src={"/image/product.jpg"}
                    height={64}
                    width={124}
                    alt="product"
                    className="w-16 rounded-lg"
                  />
                  Wireless Noise cancelling Headphones
                </TableCell>
                <TableCell>22</TableCell>
                <TableCell>24</TableCell>
                <TableCell>$230</TableCell>
                <TableCell>
                  <Badge className="bg-green-200 text-green-800">Paid</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {!isPending && data?.data && <PayoutsDashboard data={data.data} />}
    </main>
  );
}
