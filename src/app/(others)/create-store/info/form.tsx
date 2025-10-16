"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Form() {
  return (
    <div className="w-2/3 space-y-6 mt-6">
      <Label className="text-destructive">Store Name</Label>
      <Input placeholder="" className="bg-white" />

      <Label className="text-destructive">Store URL</Label>
      <Input placeholder="" className="bg-white" />
      <div className="p-2 bg-zinc-100 text-sm">
        pocketoire.com/<span className="text-destructive">username</span>
      </div>
      <p className="text-xs">This will be your unique storefront URL</p>
      <Button variant={"secondary"} className="w-full" asChild>
        <Link href={"/create-store/branding"}>Continue</Link>
      </Button>
    </div>
  );
}
