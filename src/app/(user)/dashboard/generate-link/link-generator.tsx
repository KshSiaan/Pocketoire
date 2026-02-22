import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function LinkGenerator({ url }: { url: string }) {
  const [{ token }] = useCookies(["token"]);
  const [copyState, setCopyState] = React.useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");

  React.useEffect(() => {
    if (copyState === "copied" || copyState === "error") {
      const timeoutId = setTimeout(() => {
        setCopyState("idle");
      }, 1400);

      return () => clearTimeout(timeoutId);
    }
  }, [copyState]);

  const { data, isPending } = useQuery({
    queryKey: ["generate_link", url],
    queryFn: async (): Promise<
      ApiResponse<{
        affiliate_url: string;
      }>
    > => {
      return howl(`/generate-link`, {
        method: "POST",
        body: { url },
        token,
      });
    },
  });

  const handleCopy = async () => {
    const affiliateUrl = data?.data?.affiliate_url;
    if (!affiliateUrl || copyState === "copying") return;

    try {
      setCopyState("copying");
      await navigator.clipboard.writeText(affiliateUrl);
      setCopyState("copied");
      toast.success("Link copied to clipboard!");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <div className="w-full flex items-center gap-4 mt-4">
      <Input value={data?.data?.affiliate_url || "Generating..."} readOnly />
      <Button
        variant={"secondary"}
        disabled={
          isPending || !data?.data?.affiliate_url || copyState === "copying"
        }
        onClick={handleCopy}
      >
        {copyState === "copying" ? (
          <>
            <Loader2Icon className="animate-spin" />
            Copying...
          </>
        ) : copyState === "copied" ? (
          <>
            <CheckIcon />
            Copied!
          </>
        ) : copyState === "error" ? (
          <>
            <CopyIcon />
            Try again
          </>
        ) : (
          <>
            <CopyIcon />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
