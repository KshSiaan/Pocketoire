"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((m) => m.Scanner),
  { ssr: false }
);

export default function Page() {
  return (
    <Scanner
      onScan={(result) => toast.success(result.toString())}
      onError={(err: any) => console.log(err?.message)}
    />
  );
}
