import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import Image from "next/image";
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
import type { ApiResponse } from "@/types/base";
import BrowsingHistory from "./browsing-history";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const historyOK = (await cookies()).get("historyConsent")?.value;
  const data: ApiResponse<{
    user: {
      id: number;
      name: string;
      email: string;
      profile_photo: string | null;
      account_type: string;
      saved_products: Array<{
        id: number;
        title: string;
        price: string;
        pivot: {
          user_id: number;
          product_id: number;
          created_at: string;
          updated_at: string;
        };
        product_image: {
          id: number;
          product_id: number;
          image: string;
          source: string;
          created_at: string;
          updated_at: string;
        };
      }>;
    };
  }> = await howl("/profile", {
    token,
  });
  return (
    <main className="p-4 sm:p-6 lg:p-12">
      <h1 className="text-3xl sm:text-4xl text-center">Account & Support</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="italic">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row justify-start items-center sm:items-start gap-6!">
            <div>
              <Avatar className="size-[100px] sm:size-[120px]">
                <AvatarImage
                  src={
                    data.data?.user?.profile_photo
                      ? makeImg(`storage/${data.data.user.profile_photo}`)
                      : "https://avatar.iran.liara.run/public"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center sm:text-left min-w-0">
              <h4 className="text-xl sm:text-2xl font-semibold break-words">
                {data.data?.user?.name}
              </h4>
              <p className="break-all text-sm sm:text-base">
                {data.data?.user?.email}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* {makeImg(`storage/${data.data.user.profile_photo}`)} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          {data?.data?.user?.account_type === "creator" ? (
            <Link href={"/dashboard"}>
              <Card className="hover:border-green-600 hover:border-2 hover:bg-green-600/10">
                <CardHeader>
                  <CardTitle>Creator Dashboard</CardTitle>
                  <CardDescription>
                    View your sales, products, and earnings
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <Link href={"/profile/change-password"}>
              <Card className="hover:border-blue-600 hover:border-2 hover:bg-blue-600/10">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your Account security
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}
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
                  <CardTitle className="text-xl sm:text-2xl text-destructive">
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
        <h4 className="text-2xl sm:text-3xl">Saved Products</h4>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {data.data?.user?.saved_products.map((prod, i) => (
            <Link
              href={`/store/${prod?.pivot?.user_id}/product/${prod?.id}`}
              key={i}
            >
              <Card className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform">
                <CardHeader className="px-0!">
                  <Image
                    src={
                      prod.product_image?.image
                        ? makeImg(`${prod.product_image?.image}`)
                        : "/image/product.jpeg"
                    }
                    alt="product"
                    height={500}
                    width={500}
                    unoptimized
                    className="aspect-video object-cover object-center rounded-lg"
                  />
                </CardHeader>
                <CardHeader className="px-0!">
                  <CardTitle>{prod.title}</CardTitle>
                  <div className="flex items-center gap-6 text-xl">
                    <p className="font-black">${prod.price}</p>
                    {/* <del className="font-light! opacity-80">$319.99</del> */}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      {historyOK && (
        <div className="mt-12">
          <h4 className="text-2xl sm:text-3xl">Browsing history</h4>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Suspense>
              <BrowsingHistory />
            </Suspense>
          </div>
        </div>
      )}
    </main>
  );
}
