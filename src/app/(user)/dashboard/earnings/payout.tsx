import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WalletIcon, HistoryIcon, CalendarIcon } from "lucide-react";
import Withdraw from "./withdraw";
import type { EarningsData } from "./types";

const getStatusBadge = (status: string) => {
  const normalized = status.toLowerCase();
  let className = "bg-green-100 text-green-700 hover:bg-green-200";

  if (normalized === "failed") {
    className = "bg-red-100 text-red-700 hover:bg-red-200";
  } else if (normalized === "processing") {
    className = "bg-amber-100 text-amber-700 hover:bg-amber-200";
  }

  return <Badge className={className}>{status}</Badge>;
};

const accentBgClass = "bg-[#fbebe9]"; // A light, dusty rose color

const money = (amount: number | string, currency = "USD") => {
  const safeAmount = typeof amount === "string" ? Number(amount) : amount;
  const parsed = Number.isFinite(safeAmount) ? safeAmount : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(parsed);
};

const fmtDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export function PayoutsDashboard({ data }: { data: EarningsData }) {
  const currency = data.wallet?.currency || "USD";

  return (
    <Card className="w-full">
      <h1 className="text-xl font-medium mb-6 pl-6 font-serif italic text-gray-700">
        Payouts
      </h1>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className={`p-4 shadow-none border-none ${accentBgClass}`}>
          <CardContent className="p-0 flex flex-col">
            <div className="flex items-center space-x-2 text-red-800/80 mb-2">
              <WalletIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Available to Withdraw
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-800 mb-2 font-serif">
              {money(data?.wallet?.balance || 0, currency)}
            </p>
            <p className="text-sm text-gray-600">
              Minimum withdrawal:{" "}
              <span className="font-medium">{money(50, currency)}</span>
            </p>
          </CardContent>
        </Card>

        {/* Payout History Card */}
        <Card className={`p-4 shadow-none border-none ${accentBgClass}`}>
          <CardContent className="p-0 flex flex-col">
            <div className="flex items-center space-x-2 text-red-800/80 mb-1">
              <HistoryIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">Payout History</span>
            </div>
            <p className="text-2xl italic font-bold text-gray-800 mb-1 font-serif">
              Last Payout
            </p>
            {data.last_payout ? (
              <>
                <p className="text-sm text-gray-600">
                  Date:{" "}
                  <span className="font-medium">
                    {fmtDate(data.last_payout.created_at)}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Amount:{" "}
                  <span className="font-medium">
                    {money(data.last_payout.amount, data.last_payout.currency)}
                  </span>
                </p>
                <p className="text-sm text-green-600 font-medium">
                  Status: {data.last_payout.status}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600">No payouts yet</p>
            )}
          </CardContent>
        </Card>
      </CardContent>

      {/* Action Bar */}
      <CardContent className="flex justify-between items-center mb-6">
        <Withdraw balance={data.wallet.balance} currency={currency} />
        <Button
          variant="outline"
          className="flex items-center space-x-1 text-gray-600 border border-gray-300"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Any Time</span>
        </Button>
      </CardContent>

      {/* Payouts Table */}
      <CardContent>
        {" "}
        <Table className="border-t">
          <TableHeader>
            <TableRow className="text-gray-500 hover:bg-white">
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.payouts.length ? (
              data.payouts.map((transaction) => (
                <TableRow key={transaction.id} className="text-gray-700">
                  <TableCell className="font-medium">
                    {fmtDate(transaction.created_at)}
                  </TableCell>
                  <TableCell>
                    {money(transaction.amount, transaction.currency)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.method}
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(transaction.status)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No payout records available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
