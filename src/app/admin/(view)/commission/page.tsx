"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, SearchIcon } from "lucide-react";
import React, { Suspense } from "react";
import { useCookies } from "react-cookie";
import Butts from "./butts";
import { useDebounceValue } from "@/hooks/use-debounce-value";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const [search, setSearch] = useDebounceValue("", 500);
  const [type, setType] = React.useState("");

  const { data, isPending } = useQuery({
    queryKey: ["commisions", page, search, type, status],
    queryFn: async () => {
      const query = new URLSearchParams({
        status: status === "all" ? "" : status,
        type: type === "all" ? "" : type,
        search,
        page: String(page),
      }).toString();

      const res: ApiResponse<{
        sales: Paginator<
          {
            id: number;
            product_id: number;
            user_id: number;
            booking_ref: string;
            transaction_ref: string;
            event_type: string;
            campaign_value: string;
            platform_commission: string | number | null;
            creator_commission: string | number | null;
            creator_commission_percent: string | number | null;
            product: {
              id: number;
              title: string;
            };
            user: {
              id: number;
              name: string;
              email: string;
              storefront: {
                id: number;
                user_id: number;
                name: string;
              };
            };
          }[]
        >;
      }> = await howl(`/admin/creator/view-commission?${query}`, {
        token,
      });
      return res;
    },
  });

  const sales = data?.data?.sales?.data ?? [];
  const totalItems = data?.data?.sales?.total ?? 0;
  const perPage = data?.data?.sales?.per_page ?? 10;
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

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl italic">
            Commission Management
          </CardTitle>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search Providers...."
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Select
              onValueChange={(value) => {
                setPage(1);
                setType(value);
              }}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {
                setPage(1);
                setStatus(value);
              }}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="w-full flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Product Code</TableHead>
                  <TableHead className="text-center">Campaign Value</TableHead>
                  <TableHead className="text-center">
                    Booking Reference
                  </TableHead>
                  <TableHead className="text-center">
                    Platform Commission
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Event Type</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((creator) => (
                  <TableRow key={creator?.id}>
                    <TableCell className="flex justify-center items-center gap-2">
                      <Badge variant={"outline"}>
                        {creator?.product?.id ?? "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.campaign_value}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.booking_ref}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.platform_commission ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.platform_commission ? (
                        <Badge className="bg-green-600 text-background">
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-500">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.event_type === "CONFIRMATION" ? (
                        <Badge className="bg-green-600 text-background">
                          {creator?.event_type}
                        </Badge>
                      ) : (
                        <Badge variant={"destructive"}>
                          {creator?.event_type}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="space-x-2">
                        <Suspense>
                          <Butts data={creator} />
                        </Suspense>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

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
    </main>
  );
}
