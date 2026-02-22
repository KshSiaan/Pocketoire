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
import {
  WalletIcon,
  HistoryIcon,
  CalendarIcon,
  CreditCardIcon, // Using CreditCardIcon for the 'Withdraw Money' button
} from "lucide-react";
import Withdraw from "./withdraw";

// --- Mock Data ---

const transactionHistory = [
  {
    date: "Sep 30, 2025",
    amount: "$165.50",
    method: "Bank Transfer",
    status: "Success",
  },
  {
    date: "Sep 30, 2025",
    amount: "$165.50",
    method: "Bank Transfer",
    status: "Success",
  },
  {
    date: "Sep 30, 2025",
    amount: "$165.50",
    method: "Bank Transfer",
    status: "Success",
  },
  {
    date: "Sep 30, 2025",
    amount: "$165.50",
    method: "Bank Transfer",
    status: "Success",
  },
  {
    date: "Sep 30, 2025",
    amount: "$165.50",
    method: "Bank Transfer",
    status: "Failed",
  },
];

const getStatusBadge = (status: string) => {
  //   const variant = "success"; // Custom variant for green
  let className = "bg-green-100 text-green-700 hover:bg-green-200";

  if (status === "Failed") {
    className = "bg-red-100 text-red-700 hover:bg-red-200";
  }

  return <Badge className={className}>{status}</Badge>;
};

// --- Custom Tailwind Class for the Background Cards ---

// The image uses a light, dusty rose/mauve color. We'll approximate this with a custom class.
const accentBgClass = "bg-[#fbebe9]"; // A light, dusty rose color

// --- Component ---

export function PayoutsDashboard({
  data,
}: {
  data: {
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
  };
}) {
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
              ${data?.wallet?.balance || 0}
            </p>
            <p className="text-sm text-gray-600">
              Minimum withdrawal: <span className="font-medium">$50.00</span>
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
            <p className="text-sm text-gray-600">
              Date: <span className="font-medium">Sep 30, 2025</span>
            </p>
            <p className="text-sm text-green-600 font-medium">
              Status: Success
            </p>
          </CardContent>
        </Card>
      </CardContent>

      {/* Action Bar */}
      <CardContent className="flex justify-between items-center mb-6">
        <Withdraw />
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
            {transactionHistory.map((transaction, index) => (
              <TableRow key={index} className="text-gray-700">
                <TableCell className="font-medium">
                  {transaction.date}
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(transaction.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
