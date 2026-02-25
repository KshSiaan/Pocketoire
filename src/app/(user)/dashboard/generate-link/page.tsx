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
import { SearchIcon } from "lucide-react";
import React from "react";
import Prods from "./prods";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, Paginator } from "@/types/base";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { useDebounceValue } from "@/hooks/use-debounce-value";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [search, setSearch] = useDebounceValue("", 500);
  const [destination, setDestination] = React.useState("479");
  const { data: dests, isPending: destWaiting } = useQuery({
    queryKey: ["destinations"],
    queryFn: async (): Promise<
      ApiResponse<
        {
          destinationId: number;
          name: string;
          type: string;
          defaultCurrencyCode: string;
          timeZone: string;
        }[]
      >
    > => {
      return howl(`/vaitor-products-destination`, { token });
    },
  });
  const { data, isPending } = useQuery({
    queryKey: ["all_generators", search, destination],
    queryFn: async (): Promise<
      Paginator<
        {
          product_code: string;
          name: string;
          price: number;
          currency: string;
          images: Array<string>;
          rating: number;
          url: string;
        }[]
      >
    > => {
      const params = new URLSearchParams({
        destination,
        ...(search?.trim() && { keywords: search.trim() }),
      });

      return howl(`/all-viator-products?${params}`, { token });
    },
  });

  const destinationOptions = React.useMemo(() => {
    if (destWaiting) {
      return [
        <SelectItem key="__loading" value="__loading" disabled>
          Loading...
        </SelectItem>,
      ];
    }

    return (
      dests?.data
        ?.filter((dest) => Boolean(dest?.destinationId))
        .map((dest) => (
          <SelectItem
            key={dest.destinationId}
            value={dest.destinationId.toString() ?? "0"}
          >
            {dest.name}
          </SelectItem>
        )) ?? null
    );
  }, [dests?.data, destWaiting]);
  return (
    <main>
      <h1>Generate Affiliate Link</h1>
      <div className="my-6 gap-6 grid grid-cols-4">
        <InputGroup className="bg-white rounded-none">
          <InputGroupInput
            placeholder="Search by keywords"
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align={"inline-end"}>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Select
          defaultValue="479"
          onValueChange={(value) => setDestination(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Destination" />
          </SelectTrigger>
          <SelectContent>{destinationOptions}</SelectContent>
        </Select>
      </div>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-6">
          <Prods data={data?.data} />
          {/* <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
            <code className="whitespace-pre-wrap">
              {JSON.stringify(data?.data, null, 2)}
            </code>
          </pre> */}
        </div>
      )}
    </main>
  );
}
