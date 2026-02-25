"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Controller({ id }: { id: number }) {
  const [{ token }] = useCookies(["token"]);
  const { mutate: approveMutate } = useMutation({
    mutationKey: ["approve"],
    mutationFn: async (payload: {
      id: string | number;
      status: string;
      status_reason: string;
    }): Promise<
      ApiResponse<{
        id: number;
        status: string;
        status_reason: string;
      }>
    > => {
      return howl(`/admin/storefront/${payload.id}/status`, {
        method: "PATCH",
        token,
        body: {
          status: payload.status,
          status_reason: payload.status_reason,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  return (
    <AlertDialogFooter>
      <AlertDialogAction
        className="bg-green-700!"
        onClick={() => {
          approveMutate({
            id,
            status: "approved",
            status_reason: "Admin Approval",
          });
        }}
      >
        Approve
      </AlertDialogAction>
      <AlertDialogAction
        className="bg-destructive!"
        onClick={() => {
          approveMutate({
            id,
            status: "rejected",
            status_reason: "Admin Rejection",
          });
        }}
      >
        Rejected
      </AlertDialogAction>
      <AlertDialogAction
        className="bg-destructive!"
        onClick={() => {
          approveMutate({
            id,
            status: "banned",
            status_reason: "Admin Banning",
          });
        }}
      >
        Banned
      </AlertDialogAction>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
    </AlertDialogFooter>
  );
}
