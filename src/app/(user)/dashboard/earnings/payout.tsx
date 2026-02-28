"use client";

import React from "react";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WalletIcon, HistoryIcon, CalendarIcon } from "lucide-react";
import Withdraw from "./withdraw";
import type { EarningsData } from "./types";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, Paginator } from "@/types/base";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

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
  const [{ token }] = useCookies(["token"]);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [page, setPage] = React.useState(1);

  const startDate = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "";
  const endDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "";

  const rangeLabel = React.useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
    }

    if (dateRange?.from) {
      return format(dateRange.from, "MMM dd, yyyy");
    }

    return "Any Time";
  }, [dateRange]);

  const { data: payoutData, isPending } = useQuery({
    queryKey: ["payout_earning", startDate, endDate, page],
    queryFn: async (): Promise<
      ApiResponse<
        Paginator<
          {
            id: number;
            user_id: number;
            wallet_id: number;
            amount: string;
            currency: string;
            method: string;
            status: string;
            created_at: string;
          }[]
        >
      >
    > => {
      const query = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
        page: String(page),
        per_page: "8",
      }).toString();

      return await howl(`/creator/earnings/payouts?${query}`, {
        token,
      });
    },
  });

  const payouts = payoutData?.data?.data ?? [];
  const totalItems = payoutData?.data?.total ?? 0;
  const perPage = payoutData?.data?.per_page ?? 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const pages = React.useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: Array<number | "ellipsis"> = [];
    const minPage = Math.max(2, page - 1);
    const maxPage = Math.min(totalPages - 1, page + 1);

    items.push(1);

    if (minPage > 2) {
      items.push("ellipsis");
    }

    for (let i = minPage; i <= maxPage; i += 1) {
      items.push(i);
    }

    if (maxPage < totalPages - 1) {
      items.push("ellipsis");
    }

    items.push(totalPages);
    return items;
  }, [page, totalPages]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    setPage(nextPage);
  };

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
        <Withdraw />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center space-x-1 text-gray-600 border border-gray-300"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>{rangeLabel}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(value) => {
                setDateRange(value);
                setPage(1);
              }}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardContent>

      {/* Payouts Table */}
      <CardContent>
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
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  Loading payouts...
                </TableCell>
              </TableRow>
            ) : payouts.length ? (
              payouts.map((transaction) => (
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

        {totalPages > 1 ? (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : undefined
                    }
                  />
                </PaginationItem>

                {pages.map((item, index) => (
                  <PaginationItem key={`${item}-${index}`}>
                    {item === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handlePageChange(item);
                        }}
                        isActive={item === page}
                        className={
                          item === page
                            ? "bg-destructive text-white"
                            : undefined
                        }
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(page + 1);
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
