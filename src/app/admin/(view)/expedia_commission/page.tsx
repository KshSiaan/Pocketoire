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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, SearchIcon } from "lucide-react";
import React, { Suspense } from "react";
import { useCookies } from "react-cookie";
import Butts from "./butts";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import type { ExpediaCommissionRow, ExpediaProduct } from "./types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const toNumber = (value: string | number | null | undefined) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatDateTime = (value: Date | string | null | undefined) => {
  if (!value) return "N/A";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const [page, setPage] = React.useState(1);

  const [search, setSearch] = useDebounceValue("", 500);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [productId, setProductId] = React.useState("");
  const [platformCommission, setPlatformCommission] = React.useState("");

  const { data, isPending } = useQuery({
    queryKey: ["expedia-commissions", page, search],
    queryFn: async () => {
      const query = new URLSearchParams({
        search,
        page: String(page),
      }).toString();

      const res: ApiResponse<Paginator<ExpediaCommissionRow[]>> = await howl(
        `/admin/creator/view-expedia-commission?${query}`,
        {
          token,
        },
      );
      return res;
    },
  });

  const { data: prods, isPending: proding } = useQuery<
    ApiResponse<ExpediaProduct[]>
  >({
    queryKey: ["expediaProds"],
    queryFn: async () => {
      return howl(`/admin/creator/get-expedia-products`, {
        token,
      });
    },
  });

  const { mutate, isPending: adding } = useMutation<ApiResponse<null>>({
    mutationKey: ["add_expedia_commission"],
    mutationFn: () => {
      return howl(`/admin/creator/add-expedia-commission`, {
        method: "POST",
        token,
        body: {
          product_id: Number(productId),
          platform_commission: Number(platformCommission),
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["expedia-commissions"] });
      setOpenAdd(false);
      setProductId("");
      setPlatformCommission("");
    },
  });

  const handleAddCommission = () => {
    if (!productId) {
      toast.error("Please select a product");
      return;
    }

    if (!platformCommission || Number(platformCommission) < 0) {
      toast.error("Please enter a valid commission amount");
      return;
    }

    mutate();
  };

  const sales = data?.data?.data ?? [];
  const totalItems = data?.data?.total ?? 0;
  const perPage = data?.data?.per_page ?? 10;
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
            Expedia Commission Management
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
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button>Add Commission</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Commission</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new commission.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 border-t pt-4">
                  <Label>Select Product</Label>
                  <Select value={productId} onValueChange={setProductId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {!proding &&
                        prods?.data?.map((prod) => (
                          <SelectItem key={prod?.id} value={String(prod?.id)}>
                            {prod?.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Label>Platform Commission</Label>
                  <Input
                    type="number"
                    min={0}
                    value={platformCommission}
                    onChange={(event) =>
                      setPlatformCommission(event.target.value)
                    }
                    placeholder="Enter platform commission"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setProductId("");
                        setPlatformCommission("");
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    onClick={handleAddCommission}
                    disabled={adding}
                  >
                    {adding ? "Adding..." : "Add Commission"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  <TableHead className="text-center">Product Title</TableHead>
                  <TableHead className="text-center">
                    Platform Commission
                  </TableHead>
                  <TableHead className="text-center">
                    Creator Commission
                  </TableHead>
                  <TableHead className="text-center">Creator %</TableHead>
                  <TableHead className="text-center">Currency</TableHead>
                  <TableHead className="text-center">Wallet Credited</TableHead>
                  <TableHead className="text-center">Status</TableHead>
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
                      {creator?.product?.title ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.platform_commission ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.creator_commission ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.creator_commission_percent ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {creator?.currency ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDateTime(creator?.wallet_credited_at)}
                    </TableCell>
                    <TableCell className="text-center">
                      {toNumber(creator?.platform_commission) > 0 ? (
                        <Badge className="bg-green-600 text-background">
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-500">Pending</Badge>
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
