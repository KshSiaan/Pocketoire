"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Form() {
  return (
    <div className="w-full space-y-6 mt-6">
      <Label className="text-destructive">Email</Label>
      <InputGroup className="bg-white">
        <InputGroupInput placeholder="ivan231@gmail.com" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>

      <Button className="w-full" variant={"destructive"} asChild>
        <Link href={"/admin/verify"}>Send Code</Link>
      </Button>
    </div>
  );
}
