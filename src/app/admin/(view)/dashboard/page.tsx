"use client";
import React from "react";
import Sect from "./sect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Traffic } from "./traffic";
import { Retailer } from "./retailer";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { InboxIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-6 px-4 md:px-6 lg:px-8 overflow-x-hidden">
      {/* Top Section */}
      <Sect />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Traffic Card */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader className="flex flex-wrap justify-between items-center gap-3">
            <CardTitle>Traffic Over Time</CardTitle>
            <RadioGroup
              defaultValue="option-one"
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2 text-destructive">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Monthly</Label>
              </div>
            </RadioGroup>
          </CardHeader>
          <CardContent className="flex-1">
            <Traffic />
          </CardContent>
        </Card>

        {/* Sales by Retailer */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Sales by Retailer</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Retailer />
            </div>
            <div className="space-y-3 flex flex-col justify-around">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <div className="flex items-center gap-2" key={i}>
                    <Badge className="h-3 w-8" />
                    <span className="text-sm sm:text-base">Amazon</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Products */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex justify-center items-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"} className="text-destructive">
                  <InboxIcon />
                </EmptyMedia>
                <EmptyTitle>No result found</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>

        {/* Top Creators */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Top Creators</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex justify-center items-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant={"icon"} className="text-destructive">
                  <InboxIcon />
                </EmptyMedia>
                <EmptyTitle>No result found</EmptyTitle>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
