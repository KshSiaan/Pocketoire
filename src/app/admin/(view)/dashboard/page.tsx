import React from "react";
import Sect from "./sect";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function Page() {
  return (
    <main className="h-full flex flex-col justify-start items-start gap-6">
      <Sect />
      <div className="flex-1 w-full grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Traffic Over Time</CardTitle>
            <div className="">
              <RadioGroup
                defaultValue="option-one"
                className="flex"
                orientation="horizontal"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Monthly</Label>
                </div>
              </RadioGroup>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic Over Time</CardTitle>
            <div className=""></div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic Over Time</CardTitle>
            <div className=""></div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic Over Time</CardTitle>
            <div className=""></div>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
