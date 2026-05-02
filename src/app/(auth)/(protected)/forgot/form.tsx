"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotApi } from "@/lib/api/auth";
import { useMailStore } from "@/lib/moon/email-store";
import { Button } from "@/components/ui/button";
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
import { MailIcon } from "lucide-react";
import Link from "next/link";

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotForm() {
  const navig = useRouter();
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot"],
    mutationFn: (values: ForgotFormValues) => {
      return forgotApi(values);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res, values) => {
      toast.success(res.message ?? "Success!");
      useMailStore.getState().setEmail(values.email);
      navig.push("/verify-otp");
    },
  });

  const onSubmit = (values: ForgotFormValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full lg:w-2/3 space-y-6 mt-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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

        <Button
          className="w-full"
          variant="destructive"
          type="submit"
          disabled={isPending}
        >
          Send code
        </Button>

        <div className="text-sm mt-6">
          Already have an account?{" "}
          <Button
            className="px-0 text-destructive font-semibold cursor-pointer"
            variant="link"
            type="button"
            asChild
          >
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
        <div className="text-sm">
          Don’t have account?{" "}
          <Button
            className="px-0 text-destructive font-semibold cursor-pointer"
            variant="link"
            type="button"
            asChild
          >
            <Link href={"/signup"}>Sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
