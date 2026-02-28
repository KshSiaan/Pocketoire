"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, UserCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { useStoreCreator } from "@/lib/moon/create-store";
import { set } from "zod";
import { useMutation } from "@tanstack/react-query";
import { base_api, base_url, howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { ApiResponse } from "@/types/base";

export default function Form() {
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const [desc, setDesc] = React.useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_store"],
    mutationFn: async (
      formData: FormData,
    ): Promise<
      ApiResponse<{
        storefront: {
          user_id: number;
          name: string;
          slug: string;
          status: string;
          bio: string;
          updated_at: string;
          created_at: string;
          id: number;
          user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string;
            otp: any;
            otp_verified_at: any;
            otp_expires_at: any;
            password_reset_token: any;
            password_reset_expires_at: any;
            profile_photo: string;
            cover_photo: any;
            account_type: string;
            status: string;
            status_reason: any;
            stripe_customer_id: string;
            stripe_account_id: any;
            stripe_onboarded: number;
            moderated_by: any;
            moderated_at: any;
            google_id: any;
            created_at: string;
            updated_at: string;
            wallet: any;
          };
        };
        user: {
          profile_photo: string;
          cover_photo: string;
          stripe_customer_id: string;
        };
      }>
    > => {
      const res = await fetch(`${base_url}${base_api}/storefront/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create storefront");
      }

      return res.json();
    },

    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      useStoreCreator.getState().resetStore();
      navig.push(`/create-store/success?id=${res?.data?.storefront?.id}`);
    },
  });
  useEffect(() => {
    setDesc(useStoreCreator.getState().description);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can save the description to your state management or backend
    useStoreCreator.getState().setDescription(desc);
    const formData = new FormData();
    const storeData = useStoreCreator.getState().getStoreData();
    formData.append("storename", storeData.storename || "");
    formData.append("storeurl", storeData.storeurl || "");
    formData.append("description", storeData.description ?? "");
    if (storeData.profile_photo) {
      formData.append("profile_photo", storeData.profile_photo);
    }
    if (storeData.cover_photo) {
      formData.append("cover_photo", storeData.cover_photo);
    }
    mutate(formData);
  };
  return (
    <div className="w-2/3 space-y-6! mt-6">
      <Label className="text-destructive">Short Bio/Description</Label>
      <Textarea
        className="h-[200px] w-full border border-secondary"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <p className="text-xs">
        This will help visitors understand your store's focus
      </p>
      <div className="h-2"></div>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-primary"
          onClick={() => {
            navig.back();
          }}
        >
          Back
        </Button>
        <Button
          variant={"secondary"}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Finishing..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}
