"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import React from "react";
import Prods from "./prods";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Paginator } from "@/types/base";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["all_generators"],
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
      return howl(`/all-viator-products?destination=479`, { token });
    },
  });
  return (
    <main>
      <h1>Generate Affiliate Link</h1>
      <div className="my-6 flex items-center gap-6">
        <InputGroup className="bg-white rounded-none w-[400px]">
          <InputGroupInput placeholder="Search by product name" />
          <InputGroupAddon align={"inline-end"}>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Select>
          <SelectTrigger className="bg-white rounded-none w-[25%]">
            <SelectValue placeholder="Select Retailers" />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger className="bg-white rounded-none w-[25%]">
            <SelectValue placeholder="Select Popularity" />
          </SelectTrigger>
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
