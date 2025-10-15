import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Prods from "../_home/prods";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <main className="p-12">
      <h1 className="text-4xl text-center">Account & Support</h1>
      <div className="grid grid-cols-2 mt-6 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="italic">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-start items-start gap-6!">
            <div className="">
              <Avatar className="size-[120px]">
                <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h4 className="text-2xl font-semibold">Sarah Wilson</h4>
              <p>sarah.wilson@email.com</p>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your name and profile picture
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your Account security</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Help Center</CardTitle>
              <CardDescription>Find Answe to common questions</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">
                Log out
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <h4 className="text-3xl">Saved Products</h4>
        <div className="w-full grid grid-cols-4 gap-6 mt-6">
          <Prods amm={4} />
        </div>
      </div>
      <div className="mt-12">
        <h4 className="text-3xl">Browsing history</h4>
        <div className="w-full grid grid-cols-2 gap-6 mt-6">
          {Array(4)
            .fill("")
            .map((_, i) => (
              <Card className="border-2 border-secondary" key={i}>
                <CardContent className="flex justify-start items-start w-full gap-6">
                  <Image
                    src={"/image/product.jpg"}
                    height={600}
                    width={900}
                    alt="product_img"
                    className="h-24 aspect-video! w-34 rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold">
                      Wireless Noise-Cancelling Headphones
                    </h4>
                    <p className="text-muted-foreground">By Jon Jones</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold">$299.99</p>
                      <Button variant={"link"} className="text-secondary">
                        View Again <ArrowRight />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}
