"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon, SearchIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Header from "@/components/core/header";
// import { cookies } from "next/headers";
import { howl, makeImg } from "@/lib/utils";
import type { ApiResponse, Paginator } from "@/types/base";
import type { ProductType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { Spinner } from "@/components/ui/spinner";
import Prodss from "./prodss";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ExploreProductType extends ProductType {
  product_image: {
    id: number;
    product_id: number;
    image: string;
    source: string;
    created_at: string;
    updated_at: string;
  } | null;
}

interface ExploreResponseType {
  products: Paginator<ExploreProductType[]>;
  featured_storefronts: Array<{
    id: number;
    user_id: number;
    name: string;
    slug: string;
    status: string;
    status_reason?: string;
    bio: string;
    instagram_link: string;
    tiktok_link: string;
    moderated_by: Date;
    moderated_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    user: {
      id: number;
      name: string;
      profile_photo: string;
      cover_photo: string;
    };
  }>;
}

export default function Page() {
  const searchParams = useSearchParams();
  const perPage = 16;

  const initialSearch = searchParams.get("search") ?? "";
  const initialSort = searchParams.get("sort") || "newest";

  const parsedMin = Number(searchParams.get("min_price") ?? "0");
  const parsedMax = Number(searchParams.get("max_price") ?? "100000");
  const safeMin = Number.isFinite(parsedMin) ? Math.max(0, parsedMin) : 0;
  const safeMax = Number.isFinite(parsedMax)
    ? Math.max(safeMin, parsedMax)
    : 100000;

  const [minMax, setMinMax] = useState<[number, number]>([safeMin, safeMax]);
  const [debouncedMin] = useDebounceValue(minMax[0], 500);
  const [debouncedMax] = useDebounceValue(minMax[1], 500);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useDebounceValue(initialSearch, 500);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setMinMax([safeMin, safeMax]);
    setSearchInput(initialSearch);
    setSearch(initialSearch);
    setSort(initialSort);
    setPage(1);
  }, [initialSearch, initialSort, safeMin, safeMax, setSearch]);

  // popular,newest,oldest,name_asc,name_desc.
  const { data, isPending, isRefetching } = useQuery({
    queryKey: [
      "explore_products",
      search,
      sort,
      debouncedMin,
      debouncedMax,
      page,
    ],
    placeholderData: (prev) => prev,
    queryFn: async (): Promise<ApiResponse<ExploreResponseType>> => {
      const safeSearch = encodeURIComponent(search);
      const safeSort = encodeURIComponent(sort === "all" ? "" : sort);
      const safeMin = encodeURIComponent(String(debouncedMin));
      const safeMax = encodeURIComponent(String(debouncedMax));
      return await howl(
        `/products?search=${safeSearch}&sort=${safeSort}&minPrice=${safeMin}&maxPrice=${safeMax}&per_page=${perPage}&page=${page}`,
      );
    },
  });

  const paginator = data?.data?.products;
  const totalItems = paginator?.total ?? 0;
  const currentPerPage = paginator?.per_page ?? perPage;
  const totalPages = Math.max(1, Math.ceil(totalItems / currentPerPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pages = useMemo(() => {
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
    <>
      <Header
        title="Explore Amazing Products"
        desc="Discover curated products from top creators and find your next favorite item"
      />

      <main className="mt-12 p-4 lg:p-12">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
          <div className="border-t pt-6 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
            <Label className="text-lg sm:text-xl uppercase">Price Range</Label>
            <DualRangeSlider
              value={minMax}
              onValueChange={(val) => {
                setPage(1);
                setMinMax(val as [number, number]);
              }}
              min={0}
              max={100000}
              step={1}
            />
            <div className="w-full grid grid-cols-2 gap-2">
              <Input
                placeholder="Min price"
                className="bg-white rounded-none"
                type="number"
                value={minMax[0]}
                onChange={(e) => {
                  const newMin = Math.max(0, Number(e.target.value) || 0);
                  if (newMin <= minMax[1]) {
                    setPage(1);
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
                    setPage(1);
                    setMinMax([minMax[0], newMax]);
                  }
                }}
              />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <InputGroup className="border-destructive rounded-none bg-white w-full md:w-[400px]">
                <InputGroupInput
                  placeholder="Search by product name, tags"
                  value={searchInput}
                  onChange={(e) => {
                    setPage(1);
                    setSearchInput(e.target.value);
                    setSearch(e.target.value);
                  }}
                />
                <InputGroupAddon align={"inline-end"}>
                  {isRefetching ? <Spinner /> : <SearchIcon />}
                </InputGroupAddon>
              </InputGroup>

              <div className="w-full md:w-auto flex justify-end gap-3 items-center flex-wrap">
                <p>Sort by:</p>
                <Select
                  value={sort}
                  onValueChange={(value) => {
                    setPage(1);
                    setSort(value);
                  }}
                >
                  <SelectTrigger className="w-[240px] bg-white rounded-none">
                    <SelectValue placeholder="Newest Arrivals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="price_low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="oldest">Oldest Arrivals</SelectItem>
                    <SelectItem value="title_asc">Title: A to Z</SelectItem>
                    <SelectItem value="title_desc">Title: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full grid lg:grid-cols-3 gap-6 mt-6">
              {isPending ? (
                <div className="lg:col-span-3 flex justify-center items-center h-24 mx-auto">
                  <Loader2Icon className="animate-spin" />
                </div>
              ) : (
                <Prodss data={paginator?.data ?? []} />
              )}
            </div>

            {totalPages > 1 ? (
              <div className="my-24">
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
                            className={`rounded-full border ${
                              item === page
                                ? "bg-destructive text-background"
                                : "bg-white"
                            }`}
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
          </div>
        </section>
        <div className="py-12">
          <h2 className="text-4xl text-center font-semibold text-primary italic">
            Featured Storefronts
          </h2>
        </div>
        <section className="grid grid-cols-4 gap-6">
          {data?.data?.featured_storefronts?.map((store) => (
            <Card
              className="border-destructive border-2 rounded-lg text-primary p-4!"
              key={store.id}
            >
              <CardHeader className="px-0! relative">
                <Image
                  src={
                    store.user.cover_photo
                      ? makeImg(`storage/${store.user.cover_photo}`)
                      : "/image/login.jpg"
                  }
                  unoptimized
                  alt="product"
                  height={500}
                  width={500}
                  className="aspect-video object-cover object-center rounded-lg"
                />
                <Avatar className="absolute size-16 -bottom-7 left-4 border-4 border-destructive outline-4 outline-background">
                  <AvatarImage
                    src={
                      store.user.profile_photo
                        ? makeImg(`storage/${store.user.profile_photo}`)
                        : "https://avatar.iran.liara.run/public"
                    }
                  />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardHeader className="px-0! mt-6">
                <CardTitle className="text-primary font-bold text-xl">
                  {store.name}
                </CardTitle>
                <CardDescription>By {store.user.name}</CardDescription>
                {/* <p className="font-semibold text-secondary">
                  {store.total_products} Products
                </p> */}
                <div className="flex items-center gap-6 text-lg">
                  <p className="font-light italic">
                    {store?.bio?.length > 100
                      ? store.bio.slice(0, 100) + "..."
                      : store.bio || "No description provided"}
                  </p>
                </div>
              </CardHeader>
              <CardFooter className="px-0!">
                <Button
                  size={"lg"}
                  className="w-full"
                  variant={"secondary"}
                  asChild
                >
                  <Link href={`/store/${store.id}`}>Visit Storefront</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
}
