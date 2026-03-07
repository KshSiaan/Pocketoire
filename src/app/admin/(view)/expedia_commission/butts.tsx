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
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { EyeIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { ExpediaCommissionRow } from "./types";

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
  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") return "-";
    return String(value);
  };

  return (
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
