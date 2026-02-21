"use client";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/lib/moon/user-store";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function CreateStore() {
  if (useMeStore.getState().me?.account_type === "creator") {
    return (
      <Button variant={"outline"} asChild>
        <Link href={"/dashboard"}>
          Manage your store <ArrowRightIcon />
        </Link>
      </Button>
    );
  }
  return (
    <Button variant={"outline"} asChild>
      <Link href={"/create-store/info"}>
        Start your store <ArrowRightIcon />
      </Link>
    </Button>
  );
}
