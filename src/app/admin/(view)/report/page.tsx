"use client";
import React from "react";
import Sect from "./sect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { InboxIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-6 px-4 md:px-6 lg:px-8 overflow-x-hidden">
      {/* Top Section */}
      <Sect />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Traffic Card */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader className="">
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
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

        {/* Sales by Retailer */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Top Creators</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
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

        {/* Top Performing Products */}
        <Card className="lg:min-h-[400px] flex flex-col col-span-2">
          <CardHeader>
            <CardTitle>Clicks by Retailers</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 grid grid-cols-3 gap-6">
            {Array(6)
              .fill("")
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>Expedia</CardTitle>
                    <p>25%</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-4xl text-secondary">3,257</p>
                    <Progress max={100} value={25} />
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
