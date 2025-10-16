"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCardIcon, ImageIcon, UserCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Form() {
  const navig = useRouter();
  return (
    <div className="w-2/3 space-y-6! mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add card</CardTitle>
        </CardHeader>
        <CardContent className="">
          <CardDescription>Card information</CardDescription>
          <InputGroup className="rounded-b-none! mt-2">
            <InputGroupInput placeholder="Acount no" />
            <InputGroupAddon align={"inline-end"}>
              <CreditCardIcon />
            </InputGroupAddon>
          </InputGroup>
          <div className="w-full grid grid-cols-2">
            <InputGroup className="rounded-t-none! rounded-br-none!">
              <InputGroupInput placeholder="MM/YY" />
            </InputGroup>
            <InputGroup className="rounded-t-none! rounded-bl-none!">
              <InputGroupInput placeholder="CVC" />
              <InputGroupAddon align={"inline-end"}>
                <CreditCardIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CardDescription className="mt-6 mb-2">
            Billing address
          </CardDescription>
          <div className="space-y-4">
            <CountryDropdown placeholder="Select country" onChange={() => {}} />
            <Input placeholder="Zip" />
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label className="text-xs">
                Save this card for future payment
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
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
          <Link href={"/create-store/success"}>Create My Storefront</Link>
        </Button>
      </div>
    </div>
  );
}
