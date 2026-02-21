import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { BoxesIcon } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import { howl, makeImg } from "@/lib/utils";
import type { ApiResponse, Paginator } from "@/types/base";
import type { ProductType } from "@/types/global";
import Link from "next/link";

import Prodss from "./prods";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: ApiResponse<{
    profile: {
      store_name: string;
      bio: string;
      profile_photo: string;
      cover_photo: string;
      store_slug: string;
      instagram: any;
      tiktok: any;
      total_products: number;
    };
    products: Paginator<ProductType[]>;
  }> = await howl(`/storefront/${id}/profile`);
  return (
    <>
      {/* Header */}
      <header className="h-[50dvh] p-4 sm:p-6 mb-[120px] relative">
        <div className="w-full h-full bg-primary rounded-lg relative">
          <Image
            src={
              data?.data?.profile?.cover_photo
                ? makeImg(`storage/${data?.data?.profile?.cover_photo}`)
                : "/image/cover.jpg"
            }
            fill
            unoptimized
            alt="cover_photo"
            className="object-cover rounded-lg"
          />
          <Avatar className="absolute size-[150px] sm:size-[180px] md:size-[220px] -bottom-[75px] sm:-bottom-[90px] md:-bottom-[110px] left-1/2 md:left-[110px] -translate-x-1/2 md:translate-x-0 border-4 border-destructive outline-4 outline-background z-50">
            <AvatarImage
              src={
                data?.data?.profile?.profile_photo
                  ? makeImg(`storage/${data?.data?.profile?.profile_photo}`)
                  : "https://avatar.iran.liara.run/public"
              }
            />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12">
        {/* Store Info */}
        <section className="px-0 sm:px-10 lg:px-20 space-y-4 mb-12 text-center md:text-left">
          <span className="flex flex-col md:flex-row md:items-start gap-4 md:gap-2 justify-center md:justify-start">
            <h1 className="text-3xl sm:text-4xl font-bold mr-0 md:mr-6">
              {data?.data?.profile?.store_name || "N/A"}
            </h1>
            <div className="flex justify-center md:justify-start gap-3">
              {data?.data?.profile?.instagram && (
                <Button
                  variant={"ghost"}
                  className="bg-secondary/20 text-secondary rounded-full"
                  size={"icon"}
                  asChild
                >
                  <Link href={data?.data?.profile?.instagram || "#"}>
                    <FaInstagram />
                  </Link>
                </Button>
              )}
              {data?.data?.profile?.tiktok && (
                <Button
                  variant={"ghost"}
                  className="bg-secondary/20 text-secondary rounded-full"
                  size={"icon"}
                  asChild
                >
                  <Link href={data?.data?.profile?.tiktok || "#"}>
                    <FaTiktok />
                  </Link>
                </Button>
              )}
            </div>
          </span>

          <span className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4">
            <p className="text-lg sm:text-xl">by N/A</p>
            <span className="flex items-center gap-2">
              <BoxesIcon className="text-secondary w-5 h-5" />
              <p className="text-secondary font-semibold text-base sm:text-lg">
                {data?.data?.profile?.total_products || 0} Products
              </p>
            </span>
          </span>

          <h4 className="text-xl sm:text-2xl font-bold">About This Store</h4>
          <p className="text-base sm:text-lg max-w-2xl mx-auto md:mx-0">
            {data?.data?.profile?.bio ||
              "No description provided for this store."}
          </p>
        </section>

        <Suspense>
          <Prodss id={id} />
        </Suspense>
      </main>
    </>
  );
}
