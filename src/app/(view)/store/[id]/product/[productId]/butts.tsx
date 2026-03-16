"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import { CopyIcon, HeartIcon, Share2Icon, ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Butts({
  id,
  productId,
  storeId,
  title,
  desc,
  isSaved,
}: {
  id?: string;
  productId: string;
  storeId?: string;
  title?: string;
  desc?: string;
  isSaved?: boolean;
}) {
  const [{ token }] = useCookies(["token"]);
  const [isShareDialogOpen, setIsShareDialogOpen] = React.useState(false);
  const linkFieldId = React.useId();
  const navig = useRouter();

  const productUrl = React.useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    if (!storeId || !id) {
      return `${window.location.origin}${window.location.pathname}`;
    }

    return `${window.location.origin}/store/${storeId}/product/${id}`;
  }, [id, storeId]);

  const canUseNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleNativeShare = async () => {
    if (!canUseNativeShare || !productUrl) {
      toast.error("Native share is not available for now");
      return;
    }

    try {
      await navigator.share({
        title,
        text: desc,
        url: productUrl,
      });
      setIsShareDialogOpen(false);
    } catch {
      // user cancelled native share flow
    }
  };

  const handleCopyLink = async () => {
    if (!productUrl) {
      toast.error("Unable to generate share link");
      return;
    }

    const copied = await copyToClipboardWithFallback(productUrl);

    if (copied) {
      toast.success("Link copied");
      return;
    }

    const input = document.getElementById(
      linkFieldId,
    ) as HTMLInputElement | null;
    if (input) {
      input.focus();
      input.select();
      toast.error("Auto-copy failed. Link selected so you can copy manually.");
      return;
    }

    toast.error("Something went wrong while copying the link");
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["heart_toggle"],
    mutationFn: async (): Promise<ApiResponse<null>> => {
      return howl(`/saved-products/${productId}/toggle`, {
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
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"outline"}
            className="text-secondary border-secondary"
          >
            <Share2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share product</DialogTitle>
            <DialogDescription>
              Choose native share or use one of the manual options.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              id={linkFieldId}
              value={productUrl}
              readOnly
              onFocus={(e) => e.currentTarget.select()}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleCopyLink}>
                <CopyIcon />
                Copy link
              </Button>
              {canUseNativeShare ? (
                <Button onClick={handleNativeShare}>
                  <ShareIcon /> Share
                </Button>
              ) : null}
              {/* <Button
                variant="secondary"
                onClick={() => openShareWindow("https://wa.me/", "text")}
              >
                WhatsApp
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  openShareWindow("https://x.com/intent/post", "text")
                }
              >
                X
              </Button> */}
            </div>
          </div>

          {/* <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setIsShareDialogOpen(false);
              }}
            >
              Close
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function copyToClipboardWithFallback(text: string): Promise<boolean> {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy copy methods
    }
  }

  if (typeof document === "undefined") {
    return false;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(textarea);
  return copied;
}
