"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { howl } from "@/lib/utils";
import type { ApiResponse, Paginator } from "@/types/base";

import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckIcon, EyeIcon, Flag, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [search, setSearch] = useDebounceValue("", 500);
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const perPage = 16;
  const { data, refetch } = useQuery({
    queryKey: ["admin_products", search, status, page, perPage],
    queryFn: async (): Promise<
      ApiResponse<
        Paginator<
          {
            id: number;
            user_id: number;
            storefront_id: number;
            title: string;
            status: string;
            product_link: string;
            storefront: {
              id: number;
              name: string;
            };
            user: {
              id: number;
              name: string;
            };
            product_image: {
              id: number;
              product_id: number;
              image: string;
              source: string;
              created_at: string;
              updated_at: string;
            };
          }[]
        >
      >
    > => {
      const safeSearch = encodeURIComponent(search);
      const safeStatus = encodeURIComponent(status === "all" ? "" : status);
      return howl(
        `/admin/products?per_page=${perPage}&page=${page}&search=${safeSearch}&status=${safeStatus}`,
        {
          token,
        },
      );
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["update_content"],
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: string;
    }): Promise<ApiResponse<unknown>> => {
      return howl(`/admin/products/${id}`, {
        token,
        method: "PATCH",
        body: {
          status,
        },
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

  const paginator = data?.data;
  const totalItems = paginator?.total ?? 0;
  const currentPerPage = paginator?.per_page ?? perPage;
  const totalPages = Math.max(1, Math.ceil(totalItems / currentPerPage));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pages = React.useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items: Array<number | "ellipsis"> = [];
    const minPage = Math.max(2, page - 1);
    const maxPage = Math.min(totalPages - 1, page + 1);

    items.push(1);

    if (minPage > 2) {
      items.push("ellipsis");
    }

    for (let current = minPage; current <= maxPage; current += 1) {
      items.push(current);
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
          <CardTitle className="text-2xl italic">Product Listings</CardTitle>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput
                placeholder="Search product...."
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            {/* <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Filter by Retailer" />
              </SelectTrigger>
            </Select> */}
            <Select
              onValueChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-t">
                <TableHead className="italic">Product Name</TableHead>
                <TableHead className="italic">Retailer</TableHead>
                <TableHead className="italic">Creator</TableHead>
                <TableHead className="italic">Status</TableHead>
                <TableHead className=" italic">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginator?.data?.map((product, index) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.storefront.name}</TableCell>
                  <TableCell>{product.user.name}</TableCell>
                  <TableCell>
                    {product.status === "approved" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100/90 font-normal">
                        {product.status}
                      </Badge>
                    ) : product.status === "pending" ? (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100/90 font-normal">
                        {product.status}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100/90 font-normal">
                        {product.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className=" space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                      asChild
                    >
                      <Link
                        href={`/store/${product.storefront.id}/product/${product.id}`}
                      >
                        <EyeIcon className="h-4 w-4 text-gray-700" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={product.status === "approved"}
                          className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                        >
                          <CheckIcon className="h-4 w-4 text-gray-700" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to approve this product?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will make the product visible to all
                            users.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            onClick={() => {
                              mutate({
                                id: product.id,
                                status: "approved",
                              });
                            }}
                          >
                            Approve
                          </AlertDialogAction>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                        >
                          <Flag className="h-4 w-4 text-gray-700" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to reject this product?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will make the product hidden from all
                            users.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction
                            onClick={() => {
                              mutate({
                                id: product.id,
                                status: "rejected",
                              });
                            }}
                          >
                            Rejected
                          </AlertDialogAction>
                          <AlertDialogAction
                            onClick={() => {
                              mutate({
                                id: product.id,
                                status: "flagged",
                              });
                            }}
                          >
                            Flagged
                          </AlertDialogAction>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {totalPages > 1 ? (
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
          ) : null}
        </CardFooter>
      </Card>
    </main>
  );
}
