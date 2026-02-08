"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMailStore } from "@/lib/moon/email-store";
import { verifyOtpApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
export default function Form() {
  const availableEmail = useMailStore((state) => state.email);
  const [otp, setOtp] = useState("");
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["verify_otp"],
    mutationFn: () => {
      const body = { email: availableEmail, otp };
      return verifyOtpApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      console.log(res);
      useMailStore.getState().removeEmail();
      navig.push("/login");
    },
  });
  return (
    <div className="w-2/3 space-y-6 mt-6">
      <div className="flex justify-center items-center">
        <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPGroup key={i}>
              <InputOTPSlot index={i} className="bg-white" />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>

      <Button
        className="w-full"
        variant={"destructive"}
        disabled={otp.length !== 6 || !availableEmail}
        onClick={() => mutate()}
      >
        {!availableEmail ? "Something went wrong" : "Verify"}
      </Button>
      <div className="w-full flex justify-between items-center">
        <div className=""></div>
        <p className="text-xs">
          Didn't get a code?
          <Button
            className="text-destructive font-semibold px-2 text-xs"
            variant={"link"}
          >
            Send again
          </Button>
        </p>
      </div>
    </div>
  );
}
