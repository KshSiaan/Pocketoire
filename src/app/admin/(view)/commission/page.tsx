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
import { howl } from "@/lib/utils";
import { ApiResponse, Paginator } from "@/types/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckIcon,
  EyeIcon,
  Loader2Icon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
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
            platform_commission: any;
            creator_commission: any;
            creator_commission_percent: any;
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
      }> = await howl(
        `/admin/creator/view-commission?status=${status === "all" ? "" : status}&type=${type === "all" ? "" : type}&search=${search}&page=${page}`,
        {
          token,
        },
      );
      return res;
    },
  });
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
                  setSearch(e.target.value);
                }}
                placeholder="Search Providers...."
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setStatus(value)}>
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
                  <TableHead className="text-center">Event Type</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.sales?.data?.map((creator) => (
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
                    <TableCell className="flex justify-center items-center">
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
        </CardContent>
      </Card>
    </main>
  );
}
