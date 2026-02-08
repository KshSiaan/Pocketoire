"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon, KeyRoundIcon, MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { loginApi } from "@/lib/api/auth";
import { useMeStore } from "@/lib/moon/user-store";

/* ---------------- schema ---------------- */
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [, setToken] = useCookies(["token"]);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { remember } = form.watch();

  /* ---------------- mutation ---------------- */
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
    onError: (err: any) => {
      toast.error(err?.message ?? "Login failed");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Logged in");

      setToken("token", res.data.token, {
        path: "/",
        maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
      });

      useMeStore.getState().setMe(res.data.user);
      router.push("/admin/dashboard");
    },
  });

  function onSubmit(values: LoginSchema) {
    mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-6 mt-6"
    >
      {/* Email */}
      <div>
        <Label className="text-destructive">Email</Label>
        <InputGroup className="bg-white mt-1">
          <InputGroupInput
            placeholder="ivan231@gmail.com"
            {...form.register("email")}
          />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
        {form.formState.errors.email && (
          <p className="text-xs text-destructive mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label className="text-destructive">Password</Label>
        <InputGroup className="bg-white mt-1">
          <InputGroupInput
            type={showPassword ? "text" : "password"}
            placeholder="********"
            {...form.register("password")}
          />
          <InputGroupAddon>
            <KeyRoundIcon />
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupAddon>
        </InputGroup>
        {form.formState.errors.password && (
          <p className="text-xs text-destructive mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Remember / Forgot */}
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={form.watch("remember")}
            onCheckedChange={(v) => form.setValue("remember", !!v)}
            className="border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
          />
          <Label className="text-xs">Remember me</Label>
        </div>

        <Link
          href="/admin/forgot"
          className="text-xs font-semibold text-destructive hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        variant="destructive"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Log in"}
      </Button>

      {/* Google */}
      <Button type="button" className="w-full" variant="outline">
        <FcGoogle /> Continue with Google
      </Button>
    </form>
  );
}
