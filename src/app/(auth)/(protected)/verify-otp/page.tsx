"use client";
import { useMailStore } from "@/lib/moon/email-store";
import Base from "./base";
export default function Page() {
  const mail = useMailStore.getState().email;
  if (!mail) {
    return (
      <div className="h-dvh w-dvw flex items-center justify-center">
        <p className="text-destructive text-lg">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }
  return (
    <main className="h-dvh w-dvw p-6 grid grid-cols-2 gap-6">
      <Base
        title={"Verify email"}
        subtitle={`We have sent 4digits code at ${mail}`}
        image="/image/verify.jpg"
      />
    </main>
  );
}
