import Prods from "@/app/(view)/_home/prods";
import ProductSection from "@/components/core/product-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { base_api, base_url, howl, makeImg } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { CheckIcon, SquareArrowOutUpRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value;
  const data: ApiResponse<{
    user: {
      id: number;
      name: string;
      email: string;
      account_type: string;
      created_at: string;
      profile_photo: string;
      cover_photo: string;
      status: string;
      storefront: {
        id: number;
        user_id: number;
        name: string;
        slug: string;
        bio: string;
      };
    };
    products: {
      current_page: number;
      data: Array<{
        id: number;
        title: string;
        description: string;
        product_link: string;
        price: string;
        product_image: {
          id: number;
          product_id: number;
          image: string;
          source: string;
          created_at: string;
          updated_at: string;
        };
      }>;
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{
        url?: string;
        label: string;
        page?: number;
        active: boolean;
      }>;
      next_page_url: string;
      path: string;
      per_page: number;
      prev_page_url: any;
      to: number;
      total: number;
    };
    total_products: number;
  }> = await howl(`/admin/creators/${id}`, {
    token,
  });

  console.log(data);

  return (
    <main className="p-12">
      {/* {base_url} */}
      {/* {base_api}/admin/creator/{id} */}
      <div className="w-full grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">User Information</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-start items-start gap-6">
              <div className="">
                <Avatar className="size-12">
                  <AvatarImage src={data.data.user.profile_photo} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{data.data.user.name}</h4>
                <p className="text-xs">{data.data.user.email}</p>
                <div className="w-full grid grid-cols-4 gap-2 pt-6">
                  <div className="">
                    <p className="text-sm font-semibold">Role</p>
                    <p className="text-xl">Creator</p>
                  </div>
                  <div className="">
                    <p className="text-sm font-semibold">Joined</p>
                    <p className="text-xl">
                      {new Date(data.data.user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {/* <div className="">
                    <p className="text-sm font-semibold">Earnings</p>
                    <p className="text-xl">${data.data.total_products}</p>
                  </div> */}
                  <div className="">
                    <p className="text-sm font-semibold">Status</p>
                    {data.data.user.status === "pending" ? (
                      <Badge variant={"outline"}>{data.data.user.status}</Badge>
                    ) : data.data.user.status === "active" ? (
                      <Badge className="bg-green-600 text-background">
                        {data.data.user.status}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-600 text-background">
                        {data.data.user.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-2xl">Storefront</CardTitle>
              <Button variant={"secondary"} asChild>
                <Link href={`/store/${data.data.user.storefront.id}`}>
                  View Storefront <SquareArrowOutUpRight className="ml-2" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="w-full aspect-[3/1] relative mb-[70px]">
                <Image
                  src={
                    data.data.user.cover_photo
                      ? makeImg(`storage/${data.data.user.cover_photo}`)
                      : "/image/cover.jpg"
                  }
                  unoptimized
                  fill
                  alt="cover"
                  className="object-cover rounded-lg z-10"
                />

                <div className="size-[120px] absolute -bottom-[60px] left-12 z-30">
                  <Avatar className="size-full z-30 border-4 border-background">
                    <AvatarImage
                      src={
                        data.data.user.profile_photo
                          ? makeImg(`storage/${data.data.user.profile_photo}`)
                          : "https://avatar.iran.liara.run/public"
                      }
                    />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <h3 className="text-2xl italic">
                {data.data.user.storefront.name}
              </h3>
              <p className="text-sm">{`${data.data.user.storefront.slug}`}</p>
              <p className="text-xs">{data.data.user.storefront.bio}</p>
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
          <p>{data?.data?.total_products} products uploaded</p>
        </div>
        <div className="w-full grid grid-cols-4 gap-6 mt-6">
          {data.data.products.data.map((prod) => (
            <Link
              href={`/store/${data?.data?.user?.storefront?.id}/product/${prod?.id}`}
              key={prod?.id}
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
    </main>
  );
}
