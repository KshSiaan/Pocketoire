import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { KeyRoundIcon, MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
export default function Form() {
  return (
    <>
      <div className="lg:w-2/3 space-y-6 mt-6">
        <Label className="text-destructive">Email</Label>
        <InputGroup className="bg-white">
          <InputGroupInput placeholder="ivan231@gmail.com" />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
        <Label className="text-destructive">Name</Label>
        <InputGroup className="bg-white">
          <InputGroupInput placeholder="Enter your full name" />
          <InputGroupAddon>
            <UserIcon />
          </InputGroupAddon>
        </InputGroup>
        <Label className="text-destructive">Password</Label>
        <InputGroup className="bg-white">
          <InputGroupInput placeholder="********" />
          <InputGroupAddon>
            <KeyRoundIcon />
          </InputGroupAddon>
        </InputGroup>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              className="
                  border-destructive
                  data-[state=checked]:bg-destructive
                  data-[state=checked]:border-destructive
                "
            />
            <Label className="text-xs text-destructive">
              By creating an account, you agree to the terms of conditions &
              privacy policy.
            </Label>
          </div>
        </div>
        <Button className="w-full" variant={"destructive"}>
          Sign up
        </Button>
        <Button className="w-full" variant={"outline"}>
          <FcGoogle /> Continue with Google
        </Button>
      </div>
      <div className="text-sm mt-6">
        Have an account?{" "}
        <Button
          className="px-0 text-destructive font-semibold cursor-pointer"
          variant={"link"}
          asChild
        >
          <Link href={"/login"}>Sign in</Link>
        </Button>
      </div>
    </>
  );
}
