"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import { HeartIcon, Share2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Butts({
  id,
  storeId,
  title,
  desc,
  isSaved,
}: {
  id?: number;
  storeId?: number;
  title?: string;
  desc?: string;
  isSaved?: boolean;
}) {
  const [{ token }] = useCookies(["token"]);
  const { share } = useNativeShare();
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["heart_toggle"],
    mutationFn: async (): Promise<ApiResponse<null>> => {
      return howl(`/saved-products/${id}/toggle`, {
        token,
        method: "POST",
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
    },
  });

  return (
    <div className="flex justify-center sm:justify-start gap-3">
      <Button
        size={"icon"}
        variant={"outline"}
        className="text-secondary border-secondary"
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <HeartIcon
            className={isSaved ? "fill-destructive text-destructive" : ""}
          />
        )}
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
