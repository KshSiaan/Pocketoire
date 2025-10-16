"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, UserCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Form() {
  const navig = useRouter();
  return (
    <div className="w-2/3 space-y-6! mt-6">
      <Label className="text-destructive">Profile Picture</Label>
      <label className="">
        <div className="border border-secondary border-dashed rounded-lg py-6 text-center space-y-4 w-full">
          <UserCircle2Icon className="mx-auto text-muted-foreground size-8" />
          <h4 className="text-xl">Upload Profile Picture</h4>
          <p className="text-sm text-muted-foreground">
            Recommended: 200x200px, JPG or PNG
          </p>
          <input type="file" className="hidden" />
        </div>
      </label>
      <div className="h-2"></div>

      <Label className="text-destructive">Cover Picture</Label>
      <label className="">
        <div className="border border-secondary border-dashed rounded-lg py-6 text-center space-y-4 w-full">
          <ImageIcon className="mx-auto text-muted-foreground size-8" />
          <h4 className="text-xl">Upload Cover Photo</h4>
          <p className="text-sm text-muted-foreground">
            Recommended: 200x200px, JPG or PNG
          </p>
          <input type="file" className="hidden" />
        </div>
      </label>
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
          <Link href={"/create-store/about"}>Continue</Link>
        </Button>
      </div>
    </div>
  );
}
