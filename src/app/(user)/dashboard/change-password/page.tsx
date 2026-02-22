"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["change_password_dashboard"],
    mutationFn: async (
      values: ChangePasswordValues,
    ): Promise<ApiResponse<unknown>> => {
      return howl("/profile/password", {
        method: "PUT",
        body: values,
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Password changed successfully");
      form.reset();
    },
  });

  const toggle = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (values: ChangePasswordValues) => {
    mutate(values);
  };

  return (
    <main>
      <Card className="rounded-none">
        <CardHeader className="border-b">
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Current Password</Label>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          type={showPassword.current ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <InputGroupAddon align="inline-end">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            type="button"
                            onClick={() => toggle("current")}
                          >
                            {showPassword.current ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>New Password</Label>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          type={showPassword.new ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <InputGroupAddon align="inline-end">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            type="button"
                            onClick={() => toggle("new")}
                          >
                            {showPassword.new ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm Password</Label>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          type={showPassword.confirm ? "text" : "password"}
                          placeholder="Confirm new password"
                        />
                        <InputGroupAddon align="inline-end">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            type="button"
                            onClick={() => toggle("confirm")}
                          >
                            {showPassword.confirm ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="border-t mt-8">
              <Button
                type="submit"
                variant={"secondary"}
                disabled={form.formState.isSubmitting || isPending}
              >
                Change Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
