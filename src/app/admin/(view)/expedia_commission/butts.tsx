"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Undo2Icon, PlusIcon, PencilIcon, DollarSignIcon, EyeIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { ExpediaCommissionRow } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { toast } from "sonner";
import { ApiResponse } from "@/types/base";
import { useCookies } from "react-cookie";
import { DialogClose } from "@/components/ui/dialog";

const formatDateTime = (value: Date | string | null | undefined) => {
  if (!value) return "-";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function Butts({ data }: { data: ExpediaCommissionRow }) {
  const [commission, setCommission] = useState(
    String(data.platform_commission ?? "0"),
  );
  const [open, setOpen] = useState(false);
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_expedia_commission", data.id],
    mutationFn: (overrideCommission?: string): Promise<ApiResponse<null>> => {
      return howl(`/admin/creator/update-expedia-commission/${data.id}`, {
        method: "PATCH",
        body: {
          platform_commission:
            overrideCommission !== undefined ? overrideCommission : commission,
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
      setOpen(false);
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["expedia-commissions"] });
      setOpen(false);
    },
  });

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";
    return String(value);
  };

  const hasCommission =
    data.platform_commission != null && Number(data.platform_commission) > 0;

  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Commission Details
            <Badge variant="secondary">#{data.id}</Badge>
          </DialogTitle>
          <DialogDescription>
            Complete commission information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          <section className="space-y-3">
            <h4 className="font-medium">Commission</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                label="Platform Commission"
                value={formatValue(data.platform_commission)}
              />
              <InfoItem
                label="Creator Commission"
                value={formatValue(data.creator_commission)}
              />
              <InfoItem
                label="Creator Commission %"
                value={formatValue(data.creator_commission_percent)}
              />
              <InfoItem label="Currency" value={formatValue(data.currency)} />
              <InfoItem
                label="Wallet Credited At"
                value={formatDateTime(data.wallet_credited_at)}
              />
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <h4 className="font-medium">Timestamps</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                label="Created At"
                value={formatDateTime(data.created_at)}
              />
              <InfoItem
                label="Updated At"
                value={formatDateTime(data.updated_at)}
              />
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <h4 className="font-medium">Product</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Product ID" value={data.product_id} />
              <InfoItem label="Product Title" value={data.product?.title} />
              <InfoItem label="Product Source" value={data.product?.source} />
              <InfoItem label="Product Price" value={data.product?.price} />
              <InfoItem
                label="Product Currency"
                value={data.product?.currency}
              />
            </div>
          </section>
        </div>
      </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={hasCommission ? "secondary" : "default"}>
            {hasCommission ? (
               <><PencilIcon className="mr-2 h-4 w-4" /> Modify</>
            ) : (
               <><PlusIcon className="mr-2 h-4 w-4" /> Commission</>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="border-b pb-4">
            <DialogTitle>{hasCommission ? "Modify Commission" : "Add Commission"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Platform Commission</Label>
            <InputGroup>
              <InputGroupInput
                type="number"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                placeholder="Enter commission amount"
              />
              <InputGroupAddon>
                <DollarSignIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <DialogFooter className="flex justify-between items-center w-full flex-row">
            {hasCommission ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                        variant={"destructive"} 
                        disabled={isPending}
                        type="button"
                    >
                        <Undo2Icon className="mr-2 h-4 w-4" /> Revert
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will completely remove the commission. If the creator has already been paid, their wallet balance will be debited and could go negative. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => mutate("0")}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Yes, Revert
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            ) : (
                <div />
            )}
            <div className="flex gap-2 ml-auto">
                <DialogClose asChild>
                  <Button variant={"outline"} type="button">Cancel</Button>
                </DialogClose>
                <Button onClick={() => mutate(undefined)} disabled={isPending} type="button">
                  Save
                </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-md border bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium break-all">{value || "-"}</p>
    </div>
  );
}
