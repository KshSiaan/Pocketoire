"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon, KeyRoundIcon, MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useMeStore } from "@/lib/moon/user-store";
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [, setToken] = useCookies(["token"]);
  const [showPassword, setShowPassword] = useState(false);
  const navig = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const { remember } = form.watch();

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginSchema) => {
      return loginApi(data);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      try {
        setToken("token", res.data.token, {
          path: "/",
          maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
        });
        useMeStore.getState().setEmail(res.data.user);
        navig.push("/");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    },
  });

  function onSubmit(values: LoginSchema) {
    mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-4/5 md:w-2/3 lg:w-3/4 space-y-6 mt-6"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-destructive">Email</FormLabel>
                <FormControl>
                  <InputGroup className="bg-white mt-1">
                    <InputGroupInput
                      placeholder="ivan231@gmail.com"
                      {...field}
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-destructive">Password</FormLabel>
                <FormControl>
                  <InputGroup className="bg-white mt-1">
                    <InputGroupInput
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember / Forgot */}
          <div className="flex justify-between items-center text-xs">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                    />
                  </FormControl>
                  <FormLabel>Remember me</FormLabel>
                </FormItem>
              )}
            />

            <Link
              href="/forgot"
              className="font-semibold text-destructive hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Actions */}
          <Button type="submit" className="w-full" variant="destructive">
            Log in
          </Button>

          <Button type="button" className="w-full" variant="outline">
            <FcGoogle /> Continue with Google
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <div className="text-sm mt-6">
        Don’t have an account?{" "}
        <Button
          className="px-0 text-destructive font-semibold"
          variant="link"
          asChild
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </>
  );
}
