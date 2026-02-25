import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HeartIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Prods from "@/app/(view)/_home/prods";
import { howl, makeImg } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import ProductSection from "@/components/core/product-section";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Butts from "./butts";
import { cookies } from "next/headers";
import BrowseStore from "./browse-store";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = await params;
  const token = (await cookies()).get("token")?.value;
  const data: ApiResponse<{
    product: {
      id: number;
      user_id: number;
      storefront_id: number;
      album_id: number;
      title: string;
      description: string;
      price: string;
      currency: string;
      product_link: string;
      viator_product_code: string;
      status: string;
      is_saved: boolean;
      created_at: string;
      updated_at: string;
      storefront: {
        id: number;
        user_id: number;
        name: string;
        bio: string;
        user: {
          id: number;
          name: string;
          profile_photo: string;
          cover_photo: string;
        };
      };
      product_image: {
        id: number;
        product_id: number;
        image: string;
        source: string;
      };
    };
    related_products: Array<{
      id: number;
      user_id: number;
      storefront_id: number;
      album_id: number;
      title: string;
      description: string;
      price: string;
      currency: string;
      product_link: string;
      viator_product_code: string;
      status: string;
      created_at: string;
      updated_at: string;
      product_image: {
        id: number;
        product_id: number;
        image: string;
        source: string;
        created_at: string;
        updated_at: string;
      };
    }>;
  }> = await howl(`/products/${productId}`, { token });
  return (
    <main className="p-4 sm:p-8 lg:p-12">
      {/* Product Overview */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Image
          src={
            data?.data?.product?.product_image
              ? makeImg(`${data?.data?.product?.product_image?.image}`)
              : "/image/product.jpeg"
          }
          height={500}
          width={800}
          unoptimized
          alt="product"
          className="aspect-video rounded-lg w-full object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold italic">
            {data?.data?.product?.title ?? "Product Title"}
          </h1>

          <span className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
            <p className="text-3xl sm:text-4xl font-bold italic">
              ${data?.data?.product?.price ?? "N/A"}
            </p>
            {/* <del className="text-2xl sm:text-3xl italic text-muted-foreground">
              $399.99
            </del> */}
          </span>

          <p className="mt-4 text-base sm:text-lg leading-relaxed">
            {data?.data?.product?.description ?? "Description not available."}
          </p>

          <div className="bg-[#F0ECE2] flex justify-start items-center p-3 sm:p-4 mt-6 gap-2 italic rounded-md">
            {/* <Image
              src={"/extra/amazon.png"}
              height={32}
              width={32}
              alt="amazon_icon"
              className="size-5 sm:size-6 mr-2"
            /> */}
            Sold By{" "}
            <span className="font-bold not-italic ml-1">
              {data?.data?.product?.product_image?.source ?? "Unknown"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6">
            <Button
              variant={"secondary"}
              // size={"lg"}
              className="flex-1 flex items-center justify-center gap-2 text-base sm:text-lg"
              asChild
            >
              <Link href={data?.data?.product?.product_link} target="_blank">
                <FaShoppingCart /> Shop now at{" "}
                {data?.data?.product?.product_image?.source ?? "Unknown"}
              </Link>
            </Button>
            <Butts
              storeId={data?.data?.product?.storefront_id}
              id={data?.data?.product?.id}
              title={data?.data?.product?.title}
              desc={data?.data?.product?.description}
              isSaved={data?.data?.product?.is_saved}
            />
          </div>
        </div>
      </div>
      {/* <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </code>
      </pre> */}
      {/* Storefront Info */}
      <section className="mt-12 border-2 border-secondary rounded-lg py-8 sm:py-12 px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-start items-center sm:items-start gap-6">
        <Avatar className="size-[90px] sm:size-[100px] md:size-[120px]">
          <AvatarImage
            src={
              data?.data?.product?.storefront?.user?.profile_photo
                ? makeImg(
                    `storage/${data?.data?.product?.storefront?.user?.profile_photo}`,
                  )
                : "https://avatar.iran.liara.run/public"
            }
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left space-y-2">
          <p className="text-sm">Curated by</p>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {data?.data?.product?.storefront?.name ?? "Unknown"}’s Storefront
          </h2>
          <p className="text-sm max-w-md">
            {}
            {data?.data?.product?.storefront?.bio ??
              "No bio available for this storefront."}
          </p>
          <Button
            variant={"link"}
            className="px-0 hover:gap-4 text-secondary text-base sm:text-lg font-semibold"
            asChild
          >
            <Link href={`/store/${data?.data?.product?.storefront?.id ?? "#"}`}>
              View all products from this storefront <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-16 sm:mt-20 lg:mt-24">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl italic text-center lg:text-left">
          More from Tech & Lifestyle Essentials
        </h2>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.related_products?.map((prod, i) => (
            <Link
              href={`/store/${prod?.storefront_id}/product/${prod?.id}`}
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
      </section>
      <Suspense>
        <BrowseStore data={data?.data?.product} />
      </Suspense>
    </main>
  );
}
