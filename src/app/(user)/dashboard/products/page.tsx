"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Loader2Icon, SearchIcon } from "lucide-react";
import Prods from "./prods";
import AddProduct from "./add-product";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { data, isPending } = useQuery({
    queryKey: ["products_list"],
    queryFn: async () => {
      return howl(
        `/all-viator-products?destination=${searchTerm ? "" : "479"}&keyword=${searchTerm}&page=${page}&per_page=16`,
        {
          method: "GET",
          token,
        },
      );
    },
    placeholderData: (prev) => prev,
  });
  return (
    <main>
      <div className="w-full flex justify-end items-center">
        <AddProduct />
      </div>
      {/* {!isPending && (
        <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
          <code className="whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      )} */}
      <div className=" mt-12">
        {isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : (
          <Prods />
        )}
      </div>
    </main>
  );
}
