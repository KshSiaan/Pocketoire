"use client";
import { Button } from "@/components/ui/button";
import { HeartIcon, Share2Icon } from "lucide-react";
import React from "react";

export default function Butts({
  id,
  storeId,
}: {
  id?: number;
  storeId?: number;
}) {
  return (
    <div className="flex justify-center sm:justify-start gap-3">
      <Button
        size={"icon"}
        variant={"outline"}
        className="text-secondary border-secondary"
      >
        <HeartIcon />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        className="text-secondary border-secondary"
        onClick={() => {}}
      >
        <Share2Icon />
      </Button>
    </div>
  );
}
