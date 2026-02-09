"use client";
import { Button } from "@/components/ui/button";
import { HeartIcon, Share2Icon } from "lucide-react";
import React from "react";

export default function Butts({
  id,
  storeId,
  title,
  desc,
}: {
  id?: number;
  storeId?: number;
  title?: string;
  desc?: string;
}) {
  const { share } = useNativeShare();

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
        onClick={() => {
          share({
            title: title,
            text: desc,
            url: `${window.location.origin}/store/${storeId}/product/${id}`,
          });
        }}
      >
        <Share2Icon />
      </Button>
    </div>
  );
}

function useNativeShare() {
  const share = async ({
    title,
    text,
    url,
  }: {
    title?: string;
    text?: string;
    url: string;
  }) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled share → silently ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return { share };
}
