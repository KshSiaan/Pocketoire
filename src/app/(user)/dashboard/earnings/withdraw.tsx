"use client";
import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreditCardIcon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Withdraw() {
  const [{ token }] = useCookies(["token"]);
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [country, setCountry] = React.useState<
    | {
        alpha2: string;
        alpha3: string;
        countryCallingCodes: Array<string>;
        currencies: Array<string>;
        emoji?: string;
        ioc: string;
        languages: Array<string>;
        name: string;
        status: string;
      }
    | undefined
  >();
  const { data, isPending } = useQuery({
    queryKey: ["creator_profile"],
    queryFn: async (): Promise<
      ApiResponse<{
        data: {
          id: number;
          store_id: number;
          store_name: string;
          store_bio: string;
          name: string;
          profile_photo: string;
          cover_photo: string;
          email: string;
          storefront_url: string;
          tiktok_link: string | null;
          instagram_link: string | null;
          stripe_account_id: string;
          stripe_onboarded: number;
        };
      }>
    > => {
      return howl(`/creator/profile`, { token });
    },
  });
  const { mutate, isPending: withdrawing } = useMutation({
    mutationKey: ["withdraw_req"],
    mutationFn: (): Promise<ApiResponse<null>> => {
      return howl(`/creator/payouts`, {
        method: "POST",
        body: {
          amount,
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      setAmount("");
      setOpen(false);
    },
  });

  const { mutate: connector, isPending: connecting } = useMutation({
    mutationKey: ["connect_stripe"],
    mutationFn: (): Promise<ApiResponse<{ url: string }>> => {
      return howl(`/stripe/connect/onboard`, {
        method: "POST",
        body: {
          country: country?.alpha2 || "US",
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      window.location.href = res.data.url;
    },
  });

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className="bg-[#a53b3b] hover:bg-[#8e3333] text-white py-2 px-4 rounded shadow-md">
          <CreditCardIcon className="w-4 h-4 mr-2" />
          Withdraw Money
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>
            {data?.data?.data?.stripe_onboarded
              ? "Initiate Payout"
              : "Connect Stripe Account"}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-4">
          {data?.data?.data?.stripe_onboarded ? (
            <>
              <Label>Amount to withdraw</Label>
              <Input
                value={amount}
                placeholder="Withdraw amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              {!data.data.data.stripe_onboarded && (
                <p className="text-red-600 text-sm font-semibold">
                  Please connect your Stripe account first.
                </p>
              )}
            </>
          ) : (
            <>
              <Label>Country</Label>
              <CountryDropdown
                value={country?.alpha2}
                onChange={(e) => setCountry(e)}
              />
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {data?.data?.data?.stripe_onboarded ? (
            <Button
              variant={"secondary"}
              onClick={() => mutate()}
              disabled={
                isPending || withdrawing || !data?.data?.data?.stripe_onboarded
              }
            >
              {withdrawing ? "Processing..." : "Withdraw"}
            </Button>
          ) : (
            <Button
              variant={"secondary"}
              onClick={() => connector()}
              disabled={connecting}
            >
              Connect Stripe Account
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
