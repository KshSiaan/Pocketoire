"use client";
import { Button } from "@/components/ui/button";
import type { ApiResponse } from "@/types/base";
import { howl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { Badge } from "@/components/ui/badge";

type ProfileUser = {
  account_type?: string;
  storefront?: {
    status?: string;
  } | null;
};

type ProfileResponse = ApiResponse<{
  user: ProfileUser;
}>;

export default function CreateStore() {
  const [{ token }] = useCookies(["token"]);
  const isLoggedIn = Boolean(token);

  const { data, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () => howl<ProfileResponse>("/profile", { token }),
    enabled: isLoggedIn,
  });

  const user = data?.data?.user;
  const isCreator = user?.account_type === "creator";
  const storefrontStatus = user?.storefront?.status;
  const isPendingCreatorRequest = isCreator && storefrontStatus === "pending";

  if (!isLoggedIn) {
    return (
      <Button variant={"outline"} asChild>
        <Link href={"/login"}>
          Start your store <ArrowRightIcon />
        </Link>
      </Button>
    );
  }

  if (isLoading) {
    return (
      <Button variant={"outline"} disabled>
        Loading...
      </Button>
    );
  }

  if (isPendingCreatorRequest) {
    return (
      <Badge
        variant={"outline"}
        className="p-2 bg-background/10 text-sm text-background"
      >
        Your store request is under review. We will notify you once it is
        approved.
      </Badge>
    );
  }

  if (isCreator && storefrontStatus !== "pending") {
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
