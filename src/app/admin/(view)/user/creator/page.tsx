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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { howl } from "@/lib/utils";
import { ApiResponse, Paginator } from "@/types/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  CheckIcon,
  EyeIcon,
  Loader2Icon,
  SearchIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [perPage, setPerPage] = React.useState(100);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["creators", perPage],
    queryFn: async () => {
      const res: ApiResponse<
        Paginator<
          {
            id: number;
            name: string;
            email: string;
            status: string;
            created_at: string;
            total_clicks: number;
            total_commission: string;
            storefront: {
              id: number;
              user_id: number;
              name: string;
              slug: string;
              status: string;
            };
          }[]
        >
      > = await howl(`/admin/creators?per_page=100`, {
        token,
      });
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
      return howl(`/admin/creator/${payload.id}/status`, {
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

  const { mutate: approveMutate } = useMutation({
    mutationKey: ["approve"],
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
      return howl(`/admin/storefront/${payload.id}/status`, {
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

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl italic">Creator Management</CardTitle>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search Providers...." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
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
                  <TableHead>Storefront</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Storefront Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.data?.map((creator) => (
                  <TableRow key={creator.id}>
                    <TableCell className="flex justify-start items-center gap-2">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={"https://avatar.iran.liara.run/public"}
                        />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <p className="font-bold">{creator?.name}</p>
                        <p className="text-xs!">{creator?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{creator?.storefront?.name}</TableCell>
                    <TableCell>
                      <Badge>{creator?.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          creator?.storefront?.status === "approved"
                            ? "default"
                            : "outline"
                        }
                      >
                        {creator?.storefront?.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(creator?.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{creator?.total_clicks}</TableCell>
                    <TableCell>${creator?.total_commission}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size={"icon-sm"} variant={"outline"} asChild>
                        <Link href={`creator/${creator.id}`}>
                          <EyeIcon />
                        </Link>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size={"icon-sm"}>
                            <CheckCircleIcon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You are going to approve this store {creator.name}
                              . Once you approve this store, the creator will be
                              able to add products and start earning commission.
                              This action can be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                            <AlertDialogAction
                              disabled={
                                creator?.storefront?.status === "approved"
                              }
                              className="bg-green-700!"
                              onClick={() => {
                                approveMutate({
                                  id: creator.id,
                                  status: "approved",
                                  status_reason: "Admin Approval",
                                });
                              }}
                            >
                              Approve
                            </AlertDialogAction>
                            <AlertDialogAction
                              className="bg-destructive!"
                              disabled={
                                creator?.storefront?.status === "approved"
                              }
                              onClick={() => {
                                approveMutate({
                                  id: creator.id,
                                  status: "rejected",
                                  status_reason: "Admin Rejection",
                                });
                              }}
                            >
                              Rejected
                            </AlertDialogAction>
                            <AlertDialogAction
                              className="bg-destructive!"
                              disabled={
                                creator?.storefront?.status !== "approved"
                              }
                              onClick={() => {
                                approveMutate({
                                  id: creator.id,
                                  status: "banned",
                                  status_reason: "Admin Banning",
                                });
                              }}
                            >
                              Banned
                            </AlertDialogAction>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size={"icon-sm"} variant={"outline"}>
                            {creator.status === "suspended" ? (
                              <CheckIcon />
                            ) : (
                              <XCircleIcon />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You are going about to restrict the creator{" "}
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
                              Creator
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
      </Card>
    </main>
  );
}
