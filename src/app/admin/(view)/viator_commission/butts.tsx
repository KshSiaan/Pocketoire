"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { DollarSignIcon, EyeIcon, PlusIcon, PencilIcon, Undo2Icon } from "lucide-react";
import { useState, type ReactNode } from "react";
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

export default function Butts({
  data,
}: {
  data: {
    id: number;
    product_id: number;
    user_id: number;
    booking_ref: string;
    transaction_ref: string;
    event_type: string;
    campaign_value: string;
    platform_commission: unknown;
    creator_commission: unknown;
    creator_commission_percent: unknown;
    product: {
      id: number;
      title: string;
    };
    user: {
      id: number;
      name: string;
      email: string;
      storefront: {
        id: number;
        user_id: number;
        name: string;
      };
    };
  };
}) {
  const [commission, setCommission] = useState(
    String(data.platform_commission ?? "0"),
  );
  const [open, setOpen] = useState(false);
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["update_commission"],
    mutationFn: (overrideCommission?: string): Promise<ApiResponse<null>> => {
      return howl(`/admin/creator/add-commission`, {
        method: "POST",
        body: {
          id: data.id,
          platform_commission: overrideCommission !== undefined ? overrideCommission : commission,
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
      qcl.invalidateQueries({ queryKey: ["commisions"] });
      setOpen(false);
    },
  });

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";
    return String(value);
  };

  const hasCommission = data.platform_commission != null && Number(data.platform_commission) > 0;

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
              Complete commission and transaction information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 text-sm">
            <section className="space-y-3">
              <h4 className="font-medium">Transaction</h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem label="Booking Ref" value={data.booking_ref} />
                <InfoItem
                  label="Transaction Ref"
                  value={data.transaction_ref}
                />
                <InfoItem label="Event Type" value={data.event_type} />
                <InfoItem label="Campaign Value" value={data.campaign_value} />
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h4 className="font-medium">Commission Breakdown</h4>
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
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h4 className="font-medium">Product</h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem label="Product ID" value={data.product_id} />
                <InfoItem label="Product Title" value={data.product?.title} />
              </div>
            </section>

            <Separator />

            <section className="space-y-3">
              <h4 className="font-medium">Creator</h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem label="User ID" value={data.user_id} />
                <InfoItem label="Name" value={data.user?.name} />
                <InfoItem label="Email" value={data.user?.email} />
                <InfoItem
                  label="Storefront"
                  value={data.user?.storefront?.name || "-"}
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
          <DialogFooter className="flex sm:justify-between items-center w-full">
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
