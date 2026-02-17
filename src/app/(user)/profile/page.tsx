import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Prods from "@/app/(view)/_home/prods";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { howl, makeImg } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { ApiResponse } from "@/types/base";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data: ApiResponse<{
    user: {
      id: number;
      name: string;
      email: string;
      profile_photo: any;
      saved_products: Array<any>;
    };
  }> = await howl("/profile", {
    token,
  });
  return (
    <main className="p-12">
      {/* <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre> */}
      <h1 className="text-4xl text-center">Account & Support</h1>
      <div className="grid grid-cols-2 mt-6 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="italic">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-start items-start gap-6!">
            <div className="">
              <Avatar className="size-[120px]">
                <AvatarImage
                  src={
                    data.data?.user?.profile_photo
                      ? makeImg(`storage/${data.data.user.profile_photo}`)
                      : "https://avatar.iran.liara.run/public"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              {/* {makeImg(`storage/${data.data.user.profile_photo}`)} */}
            </div>
            <div>
              <h4 className="text-2xl font-semibold">
                {data.data?.user?.name}
              </h4>
              <p>{data.data?.user?.email}</p>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-6">
          <Link href={"/profile/edit"}>
            <Card className="hover:border-blue-600 hover:border-2 hover:bg-blue-600/10">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your name and profile picture
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href={"/profile/change-password"}>
            <Card className="hover:border-blue-600 hover:border-2 hover:bg-blue-600/10">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your Account security</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href={"/contact"}>
            <Card className="hover:border-blue-600 hover:border-2 hover:bg-blue-600/10">
              <CardHeader>
                <CardTitle>Help Center</CardTitle>
                <CardDescription>
                  Find Answe to common questions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Card className="flex justify-center items-center cursor-pointer hover:border-2 hover:border-destructive hover:bg-destructive/10">
                <CardContent className="flex justify-center items-center">
                  <CardTitle className="text-2xl text-destructive">
                    Log out
                  </CardTitle>
                </CardContent>
              </Card>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to log in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Link href="/logout">Log out</Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
