"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

import { KeyRoundIcon, MailIcon, UserIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMailStore } from "@/lib/moon/email-store";
export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export default function FormSignup() {
  const navig = useRouter();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (body: Omit<SignupFormValues, "terms">) => {
      return signupApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.push("/verify-otp");
    },
  });

  function onSubmit(values: SignupFormValues) {
    const { terms, ...body } = values;
    useMailStore.getState().setEmail(body.email);
    mutate(body);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:w-2/3 space-y-6 mt-6"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-destructive">Email</FormLabel>
              <FormControl>
                <InputGroup className="bg-white">
                  <InputGroupInput placeholder="ivan231@gmail.com" {...field} />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-destructive">Name</FormLabel>
              <FormControl>
                <InputGroup className="bg-white">
                  <InputGroupInput
                    placeholder="Enter your full name"
                    {...field}
                  />
                  <InputGroupAddon>
                    <UserIcon />
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
                <InputGroup className="bg-white">
                  <InputGroupInput
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                  <InputGroupAddon>
                    <KeyRoundIcon />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-start gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="
                    border-destructive
                    data-[state=checked]:bg-destructive
                    data-[state=checked]:border-destructive
                  "
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs text-destructive">
                  By creating an account, you agree to the terms of conditions &
                  privacy policy.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          variant="destructive"
          disabled={form.formState.isSubmitting}
        >
          Sign up
        </Button>

        <Button
          type="button"
          className="w-full"
          variant="outline"
          disabled={form.formState.isSubmitting}
        >
          <FcGoogle /> Continue with Google
        </Button>
      </form>

      <div className="text-sm mt-6">
        Have an account?{" "}
        <Button
          className="px-0 text-destructive font-semibold"
          variant="link"
          asChild
          disabled={form.formState.isSubmitting}
        >
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </Form>
  );
}
