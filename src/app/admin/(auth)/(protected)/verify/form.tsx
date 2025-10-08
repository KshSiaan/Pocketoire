"use client";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Form() {
  return (
    <div className="w-full space-y-6 mt-6">
      <div className="w-full flex justify-between items-center">
        <Label>Verification Code</Label>
        <Button className="text-destructive" variant={"link"}>
          Resend Code
        </Button>
      </div>

      <InputGroup className="bg-white">
        <InputGroupInput placeholder="OTP code" />
      </InputGroup>

      <Button className="w-full" variant={"destructive"} asChild>
        <Link href={"/admin/new-pass"}>Verify Code</Link>
      </Button>
    </div>
  );
}
