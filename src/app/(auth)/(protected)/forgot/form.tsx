import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
export default function Form() {
  return (
    <>
      <div className="w-2/3 space-y-6 mt-6">
        <Label className="text-destructive">Email</Label>
        <InputGroup className="bg-white">
          <InputGroupInput placeholder="ivan231@gmail.com" />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
        <Button className="w-full" variant={"destructive"}>
          Send code
        </Button>
      </div>
      <div className="text-sm mt-6">
        Already have an account?{" "}
        <Button
          className="px-0 text-destructive font-semibold cursor-pointer"
          variant={"link"}
        >
          Sign in
        </Button>
      </div>
      <div className="text-sm ">
        Don’t have account?{" "}
        <Button
          className="px-0 text-destructive font-semibold cursor-pointer"
          variant={"link"}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
