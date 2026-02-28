"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { howl } from "@/lib/utils";
import type { ApiResponse, Paginator } from "@/types/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import UpdateCommission from "./update-commission";
import AddCommission from "./add-commission";
import PayoutController from "./payout-controller";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [page, setPage] = React.useState(1);
  const [globalCommission, setGlobalCommission] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["payouts", page],
    queryFn: async (): Promise<
      ApiResponse<{
        global_creator_commission_percent: string;
        custom_creator_commission: Array<{
          id: number;
          user_id: number;
          creator_commission_percent: string;
          effective_from: string;
          effective_to: string;
          user: {
            id: number;
            name: string;
            email: string;
          };
        }>;
        creators: Array<{
          id: number;
          name: string;
          email: string;
          commission_percent: string;
          storefront: {
            id: number;
            user_id: number;
            name: string;
          };
          wallet: {
            id: number;
            user_id: number;
            balance: string;
            status: string;
            currency: string;
          };
        }>;
        payout_threshold: {
          id: number;
          minimum_amount: string;
          maximum_amount: string;
        };
        payouts: Paginator<
          Array<{
            id: number;
            user_id: number;
            wallet_id: number;
            amount: string;
            currency: string;
            method: string;
            status: string;
            created_at: string;
            user: {
              id: number;
              name: string;
              email: string;
              email_verified_at: string;
              otp: string | null;
              otp_verified_at: string | null;
              otp_expires_at: string | null;
              password_reset_token: string | null;
              password_reset_expires_at: string | null;
              profile_photo: string;
              cover_photo: string;
              account_type: string;
              status: string;
              status_reason: string | null;
              stripe_customer_id: string | null;
              stripe_account_id: string;
              stripe_onboarded: number;
              moderated_by: number | null;
              moderated_at: string | null;
              google_id: string | null;
              created_at: string;
              updated_at: string;
              commission_percent: string;
              storefront: {
                id: number;
                user_id: number;
                name: string;
              };
            };
            wallet: {
              id: number;
              user_id: number;
              balance: string;
              status: string;
              currency: string;
            };
          }>
        >;
      }>
    > => {
      const query = new URLSearchParams({
        page: String(page),
      }).toString();

      return howl(`/admin/payouts?${query}`, {
        method: "GET",
        token,
      });
    },
  });

  const payouts = data?.data?.payouts?.data ?? [];
  const totalItems = data?.data?.payouts?.total ?? 0;
  const perPage = data?.data?.payouts?.per_page ?? 10;
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
  const { mutate, isPending: globalLoading } = useMutation({
    mutationKey: ["update_global_commission"],
    mutationFn: (): Promise<ApiResponse<null>> => {
      return howl(`/admin/global/commission/update`, {
        method: "POST",
        token,
        body: { global_creator_commission_percent: globalCommission },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      refetch();
    },
  });

  const { mutate: updatePayoutThreshold, isPending: payoutThresholdLoading } =
    useMutation({
      mutationKey: ["update_payout_threshold"],
      mutationFn: (): Promise<ApiResponse<null>> => {
        return howl(`/admin/payout-thrsehold/update`, {
          method: "POST",
          token,
          body: { minimum_amount: min, maximum_amount: max },
        });
      },
      onError: (err) => {
        toast.error(err.message ?? "Failed to complete this request");
      },
      onSuccess: (res) => {
        toast.success(res.message ?? "Success!");
      },
    });

  useEffect(() => {
    if (data) {
      setGlobalCommission(
        Number(data?.data?.global_creator_commission_percent) || 0,
      );
      setMin(Number(data?.data?.payout_threshold?.minimum_amount) || 0);
      setMax(Number(data?.data?.payout_threshold?.maximum_amount) || 0);
    }
  }, [data]);

  return (
    <main>
      {/* <pre className="bg-gradient-to-br max-h-[80dvh] overflow-scroll fixed top-1/2 left-1/2 -translate-1/2 w-[90dvw] z-50 from-zinc-900/60 via-zinc-800/40 to-zinc-900/20 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700/20">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre> */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Commission Settings</CardTitle>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-2 gap-6">
          <div>
            <h4>Global Commission Split</h4>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="space-y-4">
                <Label>Creator (%)</Label>
                <Input
                  placeholder="70"
                  value={globalCommission}
                  onChange={(e) => {
                    setGlobalCommission(+e.target.value);
                  }}
                />
              </div>
              <div className="space-y-4">
                <Label>Platform (%)</Label>
                <Input value={String(100 - globalCommission)} readOnly />
              </div>
            </div>
            <Button
              variant={"secondary"}
              className="mt-6 w-full"
              onClick={() => {
                mutate();
              }}
              disabled={
                Number(data?.data?.global_creator_commission_percent).toFixed(
                  0,
                ) === Number(globalCommission).toFixed(0) ||
                globalLoading ||
                isPending
              }
            >
              {globalLoading ? "Updating..." : "Update"}
            </Button>
          </div>
          <div className="">
            <h4>Global Commission Split</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Creator Name</TableHead>
                  <TableHead>Current Percentage</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.custom_creator_commission?.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.user.name}</TableCell>
                    <TableCell>{rule.creator_commission_percent}%</TableCell>
                    <TableCell>
                      <UpdateCommission data={rule} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddCommission />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Creator Name</TableHead>
                <TableHead>Storefront</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Percent</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {payment?.user?.name}
                  </TableCell>
                  <TableCell>
                    {payment?.user?.storefront?.name ?? "N/A"}
                  </TableCell>
                  <TableCell>{payment?.wallet?.balance}</TableCell>
                  <TableCell>{payment?.amount}</TableCell>
                  <TableCell>{payment?.user?.commission_percent}%</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    {payment.status === "paid" ? (
                      <Badge className="bg-green-600">{payment?.status}</Badge>
                    ) : payment.status === "processing" ? (
                      <Badge className="bg-amber-500">{payment?.status}</Badge>
                    ) : (
                      <Badge variant={"destructive"}>{payment?.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <PayoutController data={payment} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!isPending && totalPages > 1 ? (
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
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : undefined
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
      <Card className="mt-6">
        <CardHeader className="border-b">
          <CardTitle>Payout Threshold</CardTitle>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <Label>Minimum Amount</Label>
            <Input
              placeholder="$30"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div className="space-y-4">
            <Label>Maximum Amount</Label>
            <Input
              placeholder="$30"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          {/* <div className="">
            <Label>Payout Frequency</Label>
            <div className="w-full pt-4 flex">
              <div className="size-12 bg-zinc-100 flex justify-center items-center rounded-lg text-secondary">
                <CreditCardIcon />
              </div>
              <div className="pl-4">
                <h6 className="font-bold">Stripe</h6>
                <p className="text-xs">1-2 business days</p>
              </div>
            </div>
          </div> */}
          <div className="h-full flex flex-col justify-end">
            <Button
              className="w-full"
              onClick={() => updatePayoutThreshold()}
              disabled={payoutThresholdLoading || isPending}
            >
              Update Payout Threshold
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
