"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { z } from "zod";

const updateCommissionSchema = z
  .object({
    creator_commission_percent: z
      .string()
      .min(1, "Commission is required")
      .refine((value) => !Number.isNaN(Number(value)), {
        message: "Commission must be a valid number",
      })
      .refine((value) => Number(value) >= 0, {
        message: "Commission must be at least 0",
      })
      .refine((value) => Number(value) <= 100, {
        message: "Commission cannot exceed 100",
      }),
    effective_from: z.string().min(1, "Effective from is required"),
    effective_to: z.string().optional(),
  })
  .refine(
    (values) => {
      if (!values.effective_to) return true;
      return values.effective_to >= values.effective_from;
    },
    {
      message: "Effective until must be on or after effective from",
      path: ["effective_to"],
    },
  );

type UpdateCommissionSchema = z.infer<typeof updateCommissionSchema>;

const extractDate = (value?: string | null) => {
  if (!value) return "";
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0] ?? "";
};

export default function UpdateCommission({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    creator_commission_percent: string;
    effective_from: string;
    effective_to: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}) {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const form = useForm<UpdateCommissionSchema>({
    resolver: zodResolver(updateCommissionSchema),
    defaultValues: {
      creator_commission_percent: String(data.creator_commission_percent ?? 0),
      effective_from: extractDate(data.effective_from),
      effective_to: extractDate(data.effective_to),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_custom_commission", data.id],
    mutationFn: (
      values: UpdateCommissionSchema,
    ): Promise<ApiResponse<null>> => {
      return howl(`/admin/custom/commission/${data.id}/update`, {
        method: "PUT",
        token,
        body: {
          //   user_id: data.user_id,
          creator_commission_percent: Number(values.creator_commission_percent),
          effective_from: `${values.effective_from} 00:00:00`,
          effective_to: values.effective_to
            ? `${values.effective_to} 23:59:59`
            : null,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["payouts"] });
      setOpen(false);
    },
  });

  const onSubmit = (values: UpdateCommissionSchema) => {
    mutate(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          form.reset({
            creator_commission_percent: String(
              data.creator_commission_percent ?? 0,
            ),
            effective_from: extractDate(data.effective_from),
            effective_to: extractDate(data.effective_to),
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Commission Rule</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="creator_commission_percent"
              render={({ field }) => (
                <FormItem className="pt-2 border-t">
                  <FormLabel>Commission percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="effective_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Effective from</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effective_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Effective Until (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant={"outline"} disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant={"default"} disabled={isPending}>
                {isPending ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
// {
//     "user_id":3,
//     "creator_commission_percent": 20,
//     "effective_from": "2026-02-01 00:00:00",
//     "effective_to": "2026-02-28 23:59:59"
// }
