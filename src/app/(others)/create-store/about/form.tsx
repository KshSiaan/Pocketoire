"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, UserCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function Form() {
  const navig = useRouter();
  return (
    <div className="w-2/3 space-y-6! mt-6">
      <Label className="text-destructive">Short Bio/Description</Label>
      <Textarea
        className="h-[200px] w-full border border-secondary"
        placeholder="Description"
      />
      <p className="text-xs">
        This will help visitors understand your store's focus
      </p>
      <div className="h-2"></div>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-primary"
          onClick={() => {
            navig.back();
          }}
        >
          Back
        </Button>
        <Button variant={"secondary"} asChild>
          <Link href={"/create-store/payment"}>Continue</Link>
        </Button>
      </div>
    </div>
  );
}
