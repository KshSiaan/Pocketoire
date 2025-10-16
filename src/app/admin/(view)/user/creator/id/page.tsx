import Prods from "@/app/(view)/_home/prods";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="p-12">
      <div className="w-full grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">User Information</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-start items-start gap-6">
              <div className="">
                <Avatar className="size-12">
                  <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <h4 className="font-bold">John Doe</h4>
                <p className="text-xs">john.doe@example.com</p>
                <div className="w-full grid grid-cols-4 gap-2 pt-6">
                  <div className="">
                    <p className="text-sm font-semibold">Role</p>
                    <p className="text-xl">Creator</p>
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Joined</p>
                    <p className="text-xl">12 Aug 2025</p>
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Earnings</p>
                    <p className="text-xl">$250</p>
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Status</p>
                    <Badge className="bg-green-600">Aprroved</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-2xl">Storefront</CardTitle>
              <Button variant={"secondary"}>
                <SquareArrowOutUpRight /> Open Store
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="w-full aspect-[3/1] relative mb-[70px]">
                <Image
                  src={"/image/cover.jpg"}
                  fill
                  alt="cover"
                  className="object-cover rounded-lg z-10"
                />

                <div className="size-[120px] absolute -bottom-[60px] left-12 z-30">
                  <Avatar className="size-full z-30 border-4 border-background">
                    <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <h3 className="text-2xl italic">John’s Style Store</h3>
              <p className="text-sm">pocketoire.com/@johnsstyle</p>
              <p className="text-xs">
                Curated fashion finds and style inspiration for the modern
                professional.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="h-auto w-full flex justify-start hover:bg-green-500/10"
                variant={"outline"}
              >
                <div className="size-8 flex justify-center items-center bg-green-600 text-background rounded-sm">
                  <CheckIcon />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start">
                  <p className="text-lg">Approve User</p>
                  <p className="text-xs">Grant access</p>
                </div>
              </Button>
              <Button
                className="h-auto w-full flex justify-start hover:bg-stone-500/10"
                variant={"outline"}
              >
                <div className="size-8 flex justify-center items-center bg-stone-600 text-background rounded-sm">
                  <CheckIcon />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start">
                  <p className="text-lg">Restrict User</p>
                  <p className="text-xs">Suspend this user</p>
                </div>
              </Button>
              <Button
                className="h-auto w-full flex justify-start hover:bg-red-500/10"
                variant={"outline"}
              >
                <div className="size-8 flex justify-center items-center bg-red-600 text-background rounded-sm">
                  <CheckIcon />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start">
                  <p className="text-lg">Delete User</p>
                  <p className="text-xs">Permanently remove user</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full mt-12">
        <div className="w-full flex justify-between items-center">
          <h4 className="text-2xl">Products</h4>
          <p>42 products uploaded</p>
        </div>
        <div className="w-full grid grid-cols-4 gap-6 mt-6">
          <Prods amm={4} />
        </div>
      </div>
    </main>
  );
}
