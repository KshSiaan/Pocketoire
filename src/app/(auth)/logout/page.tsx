"use client";
import { useMeStore } from "@/lib/moon/user-store";
import { Loader2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [{ token }, , removeCookie] = useCookies(["token"]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      removeCookie("token", { path: "/" });
      toast.success("Logged out successfully");
      useMeStore.getState().removeMe();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }, []);
  return (
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>
  );
}
