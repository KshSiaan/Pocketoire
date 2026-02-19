"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Form() {
  return (
    <div className="w-2/3 space-y-6! flex flex-col justify-center items-center">
      <CheckCircle2Icon className="size-[100px] text-green-600" />
      <h3 className="text-xl font-bold">
        Your Storefront Application Has Been Submitted
      </h3>
      <p className="text-center italic">
        Thanks for applying! Our team is reviewing your details. You’ll receive
        an email once your storefront is approved and ready to go live.
      </p>
      <div className="flex justify-center items-center">
        <Button variant={"secondary"} asChild>
          <Link href={"/dashboard"}>
            Go to Dashboard <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
