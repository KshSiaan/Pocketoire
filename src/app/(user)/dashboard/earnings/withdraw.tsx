"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCardIcon } from "lucide-react";

export default function Withdraw() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#a53b3b] hover:bg-[#8e3333] text-white py-2 px-4 rounded shadow-md">
          <CreditCardIcon className="w-4 h-4 mr-2" />
          Withdraw Money
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Initiate Payout</DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-4">
          <Label>Amount to withdraw</Label>
          <Input readOnly value={"$650"} />
          <Label>Payment Method</Label>
          <Card>
            <CardContent className="flex justify-start items-center gap-4">
              <div className="size-10 flex justify-center items-center bg-zinc-200 rounded-lg">
                <CreditCardIcon />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Stripe</p>
                <p className="text-xs">1-2 business days</p>
              </div>
              <div className="">
                <RadioGroup>
                  <RadioGroupItem value="r1" />
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          <Button variant={"link"} className=" italic text-secondary">
            + Add New payout method
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"secondary"}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
