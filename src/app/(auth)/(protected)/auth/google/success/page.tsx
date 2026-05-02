"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { exchangeGoogleTokenApi } from "@/lib/api/auth";

export default function Page() {
  const [, setCookie] = useCookies(["token"]);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const navig = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["google_auth_success", token],
    mutationFn: async (googleToken: string) => {
      return await exchangeGoogleTokenApi({ token: googleToken });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to complete authentication");
    },
    onSuccess: (res) => {
      const authToken = res?.data?.token ?? (res as { token?: string })?.token;

      if (!authToken) {
        toast.error("Authentication response did not include a token.");
        navig.replace("/login");
        return;
      }

      setCookie("token", authToken, {
        path: "/",
      });
      toast.success(res.message || "Login successful.");
      navig.replace("/");
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Missing Google authentication token.");
      navig.replace("/login");
      return;
    }

    mutate(token);
  }, [mutate, navig, token]);

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 text-center">
      <p>{isPending ? "Completing authentication..." : "Redirecting..."}</p>
    </div>
  );
}
