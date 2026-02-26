"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "@/components/core/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";

const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function Page() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["send_message"],
    mutationFn: (values: ContactValues): Promise<ApiResponse<null>> => {
      return howl(`/contact-messages`, {
        method: "POST",
        body: values,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  const onSubmit = (values: ContactValues) => {
    mutate(values);
    form.reset();
  };

  return (
    <>
      <Header
        title="Contact Us"
        desc="We’re here to help. Send us your question or feedback, and we’ll get back to you as soon as possible."
      />

      <main className="px-8 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-6 gap-10 items-start">
        {/* Contact Form */}
        <Card className="lg:col-span-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold italic text-primary">
              Send a Message
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="you@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[200px]"
                          placeholder="Write your message here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="px-8"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MailIcon className="text-secondary" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base leading-relaxed">
              <p>For direct inquiries, reach our support team at:</p>
              <p className="text-secondary font-semibold">
                pocketoiretravel@gmail.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
