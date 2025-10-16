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
    <>
      <div className="w-full sm:w-4/5 md:w-2/3 lg:w-3/4 space-y-6 mt-6">
        <div>
          <Label className="text-destructive">Email</Label>
          <InputGroup className="bg-white mt-1">
            <InputGroupInput placeholder="ivan231@gmail.com" />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div>
          <Label className="text-destructive">Password</Label>
          <InputGroup className="bg-white mt-1">
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
              align="inline-end"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              name="remember"
              className="border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Link
            href="/forgot"
            className="font-semibold text-destructive hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button className="w-full" variant="destructive">
          Log in
        </Button>
        <Button className="w-full" variant="outline">
          <FcGoogle /> Continue with Google
        </Button>
      </div>

      <div className="text-sm mt-6">
        Don’t have an account?{" "}
        <Button
          className="px-0 text-destructive font-semibold cursor-pointer"
          variant="link"
          asChild
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </>
  );
}
