"use client";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BanknoteIcon,
  ChevronLeft,
  ChevronRight,
  LinkIcon,
  Loader2Icon,
  MousePointerClickIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";

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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Suspense, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import type { ApiResponse, Paginator } from "@/types/base";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import EditProduct from "./edit";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
export default function Prods() {
  const [{ token }] = useCookies(["token"]);

  const [search, setSearch] = useDebounceValue("", 500);
  const [sort, setSort] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isPending, isRefetching, refetch } = useQuery({
    queryKey: ["store_prods", search, sort, page],

    placeholderData: (prev) => prev,
    queryFn: async (): Promise<
      ApiResponse<{
        profile: {
          store_name: string;
          bio: string;
          profile_photo: string;
          cover_photo: string;
          store_slug: string;
          instagram: string | null;
          tiktok: string | null;
          total_products: number;
        };
        products: Paginator<
          {
            id: number;
            user_id: number;
            storefront_id: number;
            album_id: number;
            title: string;
            description: string;
            price: string;
            currency: string;
            product_link: string;
            viator_product_code: string;
            status: string;
            created_at: string;
            updated_at: string;
            clicks_count: number;
            sales_count: number;
            sales_sum_creator_commission?: string;
            product_image: {
              id: number;
              product_id: number;
              image: string;
              source: string;
              created_at: string;
              updated_at: string;
            };
          }[]
        >;
      }>
    > => {
      return howl(
        `/storefront/profile?search=${search}&sort=${sort === "all" ? "" : sort}&per_page=16&page=${page}`,
        { token },
      );
    },
  });

  const { mutate, isPending: loading } = useMutation({
    mutationKey: ["delete_prod"],
    mutationFn: (id: number): Promise<ApiResponse<null>> => {
      return howl(`/creator/products/${id}`, { method: "DELETE", token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      refetch();
    },
  });

  // Reset to page 1 when filters change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const totalPages = data?.data?.products
    ? Math.ceil(data.data.products.total / data.data.products.per_page)
    : 0;
  const currentPage = data?.data?.products?.current_page || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      // window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 3; // Show 3 page numbers at most

    if (totalPages <= showPages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Sidebar Filters */}

      {/* Products */}
      <div className="col-span-1 lg:col-span-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <InputGroup className="border-destructive rounded-none bg-white w-full md:w-[400px]">
            <InputGroupInput
              placeholder="Search by product name, tags"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon align={"inline-end"}>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex items-center gap-3 md:gap-4">
            <Label htmlFor="sorter" className="whitespace-nowrap">
              Sort by:
            </Label>
            <Select defaultValue="all" onValueChange={setSort}>
              <SelectTrigger className="border-destructive rounded-none bg-white w-[180px]">
                <SelectValue placeholder="Select Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="oldest">Oldest Arrivals</SelectItem>
                <SelectItem value="title_asc">Title: A to Z</SelectItem>
                <SelectItem value="title_desc">Title: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense>
            {data?.data?.products?.data.map((prod, i) => (
              <Card
                className="border-destructive border-2 rounded-lg text-primary p-4!"
                key={i}
              >
                <CardHeader className="px-0! relative">
                  <Image
                    src={prod?.product_image?.image ?? "/image/product.jpeg"}
                    alt="product"
                    height={500}
                    width={500}
                    unoptimized
                    className="aspect-video object-cover object-center rounded-lg"
                  />
                </CardHeader>
                <CardHeader className="px-0!">
                  <CardTitle>{prod.title}</CardTitle>
                  <div className="flex items-center gap-6 text-xl">
                    <p className="font-black">
                      {prod.price} {prod.currency}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <MousePointerClickIcon />
                      Clicks
                    </p>
                    <p>{prod?.clicks_count}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <BanknoteIcon />
                      Earnings
                    </p>
                    <p className="text-green-600">
                      ${prod?.sales_sum_creator_commission ?? "0"}
                    </p>
                  </div>
                </CardHeader>
                <CardFooter className="border-t flex justify-between items-center px-0">
                  <Badge
                    variant={prod?.status === "pending" ? "outline" : "default"}
                  >
                    {prod?.status}
                  </Badge>
                  <div className="">
                    <EditProduct data={prod} />
                    <Button
                      variant={"ghost"}
                      className="hover:text-secondary hover:bg-secondary/20"
                      size={"icon"}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/store/${prod?.storefront_id}/product/${prod?.id}`,
                        );
                        toast.success("Product link copied to clipboard!");
                      }}
                    >
                      <LinkIcon />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="hover:text-secondary hover:bg-secondary/20"
                          size={"icon"}
                          disabled={loading}
                        >
                          {loading ? <Spinner /> : <Trash2Icon />}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-none">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You're about to delete this product. The action can
                            not be undone
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-none">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-none bg-secondary hover:bg-secondary/80"
                            onClick={() => {
                              mutate(prod?.id);
                            }}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </Suspense>
        </div>

        {totalPages > 1 && (
          <div className="my-16 sm:my-24 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem
                  className={`text-secondary border-secondary border rounded-full ${
                    currentPage === 1 || isPending || isRefetching
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1 && !isPending && !isRefetching) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className="rounded-full"
                  >
                    <ChevronLeft />
                  </PaginationLink>
                </PaginationItem>

                {getPageNumbers().map((pageNum, idx) => {
                  if (pageNum === "...") {
                    return (
                      <PaginationItem key={`ellipsis-${idx}`} className="px-2">
                        <span className="text-secondary">...</span>
                      </PaginationItem>
                    );
                  }

                  const isActive = pageNum === currentPage;
                  return (
                    <PaginationItem
                      key={pageNum}
                      className={`rounded-full border ${
                        isActive ? "bg-destructive text-background" : "bg-white"
                      } ${
                        isPending || isRefetching
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <PaginationLink
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isPending && !isRefetching) {
                            handlePageChange(pageNum as number);
                          }
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem
                  className={`text-secondary border-secondary border rounded-full ${
                    currentPage === totalPages || isPending || isRefetching
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        currentPage < totalPages &&
                        !isPending &&
                        !isRefetching
                      ) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className="rounded-full"
                  >
                    <ChevronRight />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
