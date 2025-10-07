"use client";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, KeyRoundIcon } from "lucide-react";

export default function Form() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-2/3 space-y-6 mt-6">
      <Label className="text-destructive">Enter Password</Label>
      <InputGroup className="bg-white">
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputGroupAddon>
          <KeyRoundIcon />
        </InputGroupAddon>
        <InputGroupAddon
          align={"inline-end"}
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupAddon>
      </InputGroup>

      <Label className="text-destructive">Re-type Password</Label>
      <InputGroup className="bg-white">
        <InputGroupInput
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-type your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputGroupAddon>
          <KeyRoundIcon />
        </InputGroupAddon>
        <InputGroupAddon
          align={"inline-end"}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="cursor-pointer"
        >
          {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupAddon>
      </InputGroup>

      <Button className="w-full" variant={"destructive"}>
        Confirm
      </Button>
    </div>
  );
}
