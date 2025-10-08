"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, KeyRoundIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-6 mt-6">
      <Label className="text-destructive">Email</Label>
      <InputGroup className="bg-white">
        <InputGroupInput placeholder="ivan231@gmail.com" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>

      <Label className="text-destructive">Password</Label>
      <InputGroup className="bg-white">
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputGroupAddon>
          <KeyRoundIcon />
        </InputGroupAddon>
        <InputGroupAddon
          align={"inline-end"}
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupAddon>
      </InputGroup>

      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            name="remember"
            className="
                border-destructive
                data-[state=checked]:bg-destructive
                data-[state=checked]:border-destructive
              "
          />
          <Label className="text-xs" htmlFor="remember">
            Remember me
          </Label>
        </div>
        <Link
          href={"/admin/forgot"}
          className="text-xs font-semibold text-destructive hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button className="w-full" variant={"destructive"} asChild>
        <Link href={"/admin/dashboard"}>Log in</Link>
      </Button>
    </div>
  );
}
