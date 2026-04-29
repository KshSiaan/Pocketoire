"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, KeyRoundIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateForgotPasswordApi } from "@/lib/api/auth";
import { useMailStore } from "@/lib/moon/email-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function FormPassword({
  email,
  passwordResetToken,
}: {
  email?: string;
  passwordResetToken?: string;
}) {
  const navig = useRouter();
  const recoveryEmail = useMailStore((state) => state.email);
  const recoveryToken = useMailStore((state) => state.passwordResetToken);
  const resolvedEmail = email ?? recoveryEmail;
  const resolvedToken = passwordResetToken ?? recoveryToken;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot_password_update"],
    mutationFn: (values: ResetPasswordValues) => {
      if (!resolvedEmail || !resolvedToken) {
        throw new Error(
          "Missing recovery details. Please restart the reset flow.",
        );
      }

      return updateForgotPasswordApi({
        email: resolvedEmail,
        password_reset_token: resolvedToken,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Password updated successfully");
      useMailStore.getState().clearRecovery();
      navig.push("/login");
    },
  });

  const missingRecovery = useMemo(
    () => !resolvedEmail || !resolvedToken,
    [resolvedEmail, resolvedToken],
  );

  const onSubmit = (values: ResetPasswordValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 mt-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label className="text-destructive">Enter Password</Label>
              <FormControl>
                <InputGroup className="bg-white">
                  <InputGroupInput
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <Label className="text-destructive">Re-type Password</Label>
              <FormControl>
                <InputGroup className="bg-white">
                  <InputGroupInput
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-type your password"
                  />
                  <InputGroupAddon>
                    <KeyRoundIcon />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {missingRecovery ? (
          <p className="text-sm text-destructive">
            Recovery details are missing. Please restart the password reset
            flow.
          </p>
        ) : null}

        <Button
          className="w-full"
          variant="destructive"
          type="submit"
          disabled={isPending || missingRecovery}
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
}
