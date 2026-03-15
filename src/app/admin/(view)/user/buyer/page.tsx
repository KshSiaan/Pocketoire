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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon, SearchIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [search, setSearch] = useDebounceValue("", 500);
  const [status, setStatus] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const { data, isPending, refetch } = useQuery({
    queryKey: ["buyers", search, status, page, perPage],
    queryFn: async () => {
      const res: ApiResponse<
        Paginator<
          {
            id: number;
            name: string;
            email: string;
            status: string;
            created_at: string;
          }[]
        >
      > = await howl(
        `/admin/buyers?keywords=${encodeURIComponent(search)}&user_status=${encodeURIComponent(
          status === "all" ? "" : status,
        )}&per_page=${perPage}&page=${page}`,
        {
          token,
        },
      );
      return res;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["restrict"],
    mutationFn: async (payload: {
      id: string | number;
      status: string;
      status_reason: string;
    }): Promise<
      ApiResponse<{
        id: number;
        status: string;
        status_reason: string;
      }>
    > => {
      return howl(`/admin/buyer/${payload.id}/status`, {
        method: "PATCH",
        token,
        body: {
          status: payload.status,
          status_reason: payload.status_reason,
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
          <CardTitle className="text-2xl italic">Buyer Management</CardTitle>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput
                placeholder="Search Buyers...."
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Select
              value={status}
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginator?.data?.map((creator) => (
                  <TableRow key={creator.id}>
                    <TableCell className="flex justify-start items-center gap-2">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={"https://avatar.iran.liara.run/public"}
                        />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <p className="font-bold">{creator.name}</p>
                        <p className="text-xs!">{creator.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>{creator.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(creator?.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size={"icon-sm"} variant={"outline"}>
                            <XCircleIcon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You are going about to restrict the buyer{" "}
                              {creator.name}. This action can not be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive!"
                              onClick={() => {
                                if (creator.status === "suspended") {
                                  mutate({
                                    id: creator.id,
                                    status: "active",
                                    status_reason: "Admin Reinstatement",
                                  });
                                } else {
                                  mutate({
                                    id: creator.id,
                                    status: "suspended",
                                    status_reason: "Violation of rules",
                                  });
                                }
                              }}
                            >
                              {creator.status === "suspended"
                                ? "Reinstate"
                                : "Restrict"}{" "}
                              Buyer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size={"icon-sm"} variant={"outline"}>
                            <Trash2Icon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You are going about to{" "}
                              {creator.status === "banned" ? "unban" : "ban"}{" "}
                              the buyer {creator.name}. This action can not be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive!"
                              onClick={() => {
                                if (creator.status === "banned") {
                                  mutate({
                                    id: creator.id,
                                    status: "active",
                                    status_reason: "Admin Reinstatement",
                                  });
                                } else {
                                  mutate({
                                    id: creator.id,
                                    status: "banned",
                                    status_reason: "Violation of rules",
                                  });
                                }
                              }}
                            >
                              {creator.status === "banned" ? "Unban" : "Ban"}{" "}
                              Buyer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
