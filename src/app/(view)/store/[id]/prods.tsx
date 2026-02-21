"use client";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";

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
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import type { ApiResponse, Paginator } from "@/types/base";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default function Prodss({ id }: { id: string }) {
  const [minMax, setMinMax] = useState<[number, number]>([0, 100000]);
  const [{ token }] = useCookies(["token"]);
  const [debouncedMin] = useDebounceValue(minMax[0], 500);
  const [debouncedMax] = useDebounceValue(minMax[1], 500);

  const [search, setSearch] = useDebounceValue("", 500);
  const [sort, setSort] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isPending, isRefetching } = useQuery({
    queryKey: ["store_prods", search, sort, debouncedMin, debouncedMax, page],

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
        `/storefront/${id}/profile?search=${search}&sort=${sort === "all" ? "" : sort}&min_price=${debouncedMin}&max_price=${debouncedMax}&per_page=16&page=${page}`,
        { token },
      );
    },
  });

  // Reset to page 1 when filters change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setPage(1);
  }, [search, sort, debouncedMin, debouncedMax]);

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
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
      {/* Sidebar Filters */}
      <div className="border-t pt-6 flex flex-col gap-6">
        <Label className="text-lg sm:text-xl uppercase">Price Range</Label>
        <DualRangeSlider
          value={minMax}
          onValueChange={(val) => setMinMax(val as [number, number])}
          min={0}
          max={100000}
          step={1}
        />
        {/* {JSON.stringify(debouncedMin)} - {JSON.stringify(debouncedMax)} */}
        <div className="w-full grid grid-cols-2 gap-2">
          <Input
            placeholder="Min price"
            className="bg-white rounded-none"
            type="number"
            value={minMax[0]}
            onChange={(e) => {
              const newMin = Math.max(0, Number(e.target.value) || 0);
              if (newMin <= minMax[1]) {
                setMinMax([newMin, minMax[1]]);
              }
            }}
          />
          <Input
            placeholder="Max price"
            className="bg-white rounded-none"
            type="number"
            value={minMax[1]}
            onChange={(e) => {
              const newMax = Math.max(0, Number(e.target.value) || 0);
              if (newMax >= minMax[0]) {
                setMinMax([minMax[0], newMax]);
              }
            }}
          />
        </div>
      </div>

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
              <Link
                href={`/store/${prod?.storefront_id}/product/${prod?.id}`}
                key={i}
              >
                <Card className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform">
                  <CardHeader className="px-0!">
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
                      <p className="font-black">${prod.price}</p>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
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
