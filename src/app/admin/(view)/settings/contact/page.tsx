"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useDebounceValue } from "@/hooks/use-debounce-value";
import { howl } from "@/lib/utils";
import type { ApiResponse, Paginator } from "@/types/base";
import { useQuery } from "@tanstack/react-query";
import {
  EyeIcon,
  InboxIcon,
  Loader2Icon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  read_by: string | null;
  created_at: string;
  updated_at: string;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "N/A";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleString();
};

const truncateMessage = (value: string, maxLength = 80) => {
  if (!value) {
    return "";
  }

  return value.length > maxLength
    ? `${value.slice(0, maxLength).trimEnd()}...`
    : value;
};

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const [search, setSearch] = useDebounceValue("", 500);

  const { data, isPending, isRefetching, refetch } = useQuery({
    queryKey: ["contact-messages", page, search, status],
    queryFn: async (): Promise<ApiResponse<Paginator<ContactMessage[]>>> => {
      const query = new URLSearchParams({
        page: String(page),
        search,
        status: status === "all" ? "" : status,
      }).toString();

      return howl(`/admin/contact-messages?${query}`, {
        token,
      });
    },
  });

  const messages = data?.data?.data ?? [];
  const totalItems = data?.data?.total ?? 0;
  const perPage = data?.data?.per_page ?? 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

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
          <div className="w-full justify-between items-center flex gap-3 flex-wrap">
            <CardTitle className="text-2xl italic">Contact Messages</CardTitle>
            <Button
              variant="secondary"
              onClick={() => {
                refetch();
              }}
            >
              <RefreshCwIcon className={isRefetching ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>

          <div className="w-full mt-6 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
            <InputGroup>
              <InputGroupInput
                onChange={(event) => {
                  setPage(1);
                  setSearch(event.target.value);
                }}
                placeholder="Search by name, email, message..."
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <Select
              onValueChange={(value) => {
                setPage(1);
                setStatus(value);
              }}
            >
              <SelectTrigger className="w-full lg:w-[260px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {isPending ? (
            <div className="w-full min-h-[240px] flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : messages.length ? (
            <>
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="border-b border-t">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => {
                    const normalizedStatus = (
                      message.status || ""
                    ).toLowerCase();
                    const isRead =
                      normalizedStatus === "read" || Boolean(message.read_by);

                    return (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">
                          {message.name}
                        </TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell className="max-w-[420px]">
                          <p className="line-clamp-1">
                            {truncateMessage(message.message)}
                          </p>
                        </TableCell>
                        <TableCell>{formatDate(message.created_at)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              isRead
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            }
                          >
                            {isRead ? "Read" : "Unread"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                                aria-label="View full message"
                              >
                                <EyeIcon className="h-4 w-4 text-gray-700" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                              <DialogHeader>
                                <DialogTitle>{message.name}</DialogTitle>
                                <DialogDescription>
                                  {message.email} •{" "}
                                  {formatDate(message.created_at)}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Message</p>
                                <p className="text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
                                  {message.message}
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
            </>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon" className="text-destructive">
                  <InboxIcon />
                </EmptyMedia>
                <EmptyTitle>No contact messages found</EmptyTitle>
              </EmptyHeader>
            </Empty>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
