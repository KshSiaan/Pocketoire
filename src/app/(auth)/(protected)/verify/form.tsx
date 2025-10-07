import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function Form() {
  return (
    <div className="w-2/3 space-y-6 mt-6">
      <div className="flex justify-center items-center">
        <InputOTP maxLength={6}>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPGroup key={i}>
              <InputOTPSlot index={i} className="bg-white" />
            </InputOTPGroup>
          ))}
        </InputOTP>
      </div>

      <Button className="w-full" variant={"destructive"}>
        Verify
      </Button>
      <div className="w-full flex justify-between items-center">
        <div className=""></div>
        <p className="text-xs">
          Didn't get a code?
          <Button
            className="text-destructive font-semibold px-2 text-xs"
            variant={"link"}
          >
            Send again
          </Button>
        </p>
      </div>
    </div>
  );
}
