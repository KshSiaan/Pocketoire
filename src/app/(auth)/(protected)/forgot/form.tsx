"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotApi } from "@/lib/api/auth";
import { useMailStore } from "@/lib/moon/email-store";
import { useRouter } from "next/navigation";
export default function Form() {
  const [email, setEmail] = useState("");
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["forgot"],
    mutationFn: () => {
      return forgotApi({ email });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      useMailStore.getState().setEmail(email);
      setEmail("");
      navig.push("/verify-otp");
    },
  });
  return (
    <>
      <div className=" w-full lg:w-2/3 space-y-6 mt-6">
        <Label className="text-destructive">Email</Label>
        <InputGroup className="bg-white">
          <InputGroupInput
            placeholder="ivan231@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={() => mutate()}
        >
          Send code
        </Button>
      </div>
      <div className="text-sm mt-6">
        Already have an account?{" "}
        <Button
          className="px-0 text-destructive font-semibold cursor-pointer"
          variant={"link"}
        >
          Sign in
        </Button>
      </div>
      <div className="text-sm ">
        Don’t have account?{" "}
        <Button
          className="px-0 text-destructive font-semibold cursor-pointer"
          variant={"link"}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
