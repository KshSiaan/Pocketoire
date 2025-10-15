"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Page() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggle = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <main>
      <Card className="rounded-none">
        <CardHeader className="border-b">
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label>Current Password</Label>
            <InputGroup>
              <InputGroupInput
                type={showPassword.current ? "text" : "password"}
                placeholder="Enter current password"
              />
              <InputGroupAddon align="inline-end">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  type="button"
                  onClick={() => toggle("current")}
                >
                  {showPassword.current ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label>New Password</Label>
            <InputGroup>
              <InputGroupInput
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter new password"
              />
              <InputGroupAddon align="inline-end">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  type="button"
                  onClick={() => toggle("new")}
                >
                  {showPassword.new ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <InputGroup>
              <InputGroupInput
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm new password"
              />
              <InputGroupAddon align="inline-end">
                <Button
                  size="icon-sm"
                  variant="ghost"
                  type="button"
                  onClick={() => toggle("confirm")}
                >
                  {showPassword.confirm ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </CardContent>

        <CardFooter className="border-t">
          <Button variant={"secondary"}>Change Password</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
