"use client";
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
import { Loader2Icon, SearchIcon } from "lucide-react";
import Stores from "./stores";
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
import { howl } from "@/lib/utils";
import { ApiResponse, Paginator } from "@/types/base";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { Spinner } from "@/components/ui/spinner";
export default function Page() {
  const [search, setSearch] = useDebounceValue("", 500);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 16;
  // popular,newest,oldest,name_asc,name_desc.
  const { data, isPending, isRefetching } = useQuery({
    queryKey: ["storefronts", search, sort, page],
    placeholderData: (prev) => prev,
    queryFn: async (): Promise<
      ApiResponse<
        Paginator<
          {
            id: number;
            user_id: number;
            name: string;
            bio: string;
            total_sold: number;
            total_products: number;
            user: {
              id: number;
              name: string;
              profile_photo: string;
              cover_photo: string;
            };
          }[]
        >
      >
    > => {
      const safeSearch = encodeURIComponent(search);
      const safeSort = encodeURIComponent(sort);
      return await howl(
        `/storefronts?search=${safeSearch}&sort=${safeSort}&per_page=${perPage}&page=${page}`,
      );
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const paginator = data?.data;
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
        title="Browse Inspiring Storefronts"
        desc="Explore unique shops from creators worldwide and uncover hidden gems
          tailored for you."
      />

      <main className="mt-12 p-4 lg:p-12">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6">
          <InputGroup className="lg:w-[400px] bg-white rounded-none!">
            <InputGroupInput
              placeholder="Search by Store Name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon align={"inline-end"}>
              {isRefetching ? <Spinner /> : <SearchIcon />}
            </InputGroupAddon>
          </InputGroup>

          <div className="w-full flex justify-end gap-6 items-center">
            <p>Sort by:</p>
            <Select onValueChange={setSort}>
              <SelectTrigger className="w-[240px] bg-white rounded-none">
                <SelectValue placeholder="Most Popular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                <SelectItem value="name_desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-4 gap-6 mt-12">
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            <Stores data={data?.data?.data} />
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
      </main>
    </>
  );
}
