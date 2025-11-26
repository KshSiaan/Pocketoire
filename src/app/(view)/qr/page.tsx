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
      onScan={(result: any) =>
        toast.success(
          <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
            <code className="whitespace-pre-wrap">
              {JSON.stringify(result[0]?.rawValue, null, 2)}
            </code>
          </pre>
        )
      }
      onError={(err: any) => console.log(err?.message)}
    />
  );
}
