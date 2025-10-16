import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, HeartIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Prods from "../../_home/prods";

export default function Page() {
  return (
    <main className="p-4 sm:p-8 lg:p-12">
      {/* Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Image
          src="/image/product.jpg"
          height={500}
          width={800}
          alt="product"
          className="aspect-video rounded-lg w-full object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold italic">
            Wireless Noise-Cancelling Headphones
          </h1>

          <span className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
            <p className="text-3xl sm:text-4xl font-bold italic">$299.99</p>
            <del className="text-2xl sm:text-3xl italic text-muted-foreground">
              $399.99
            </del>
          </span>

          <p className="mt-4 text-base sm:text-lg leading-relaxed">
            Premium over-ear headphones with active noise cancellation and
            30-hour battery life. Premium over-ear headphones with active noise
            cancellation and 30-hour battery life.
          </p>

          <div className="bg-[#F0ECE2] flex justify-start items-center p-3 sm:p-4 mt-6 gap-2 italic rounded-md">
            <Image
              src={"/extra/amazon.png"}
              height={32}
              width={32}
              alt="amazon_icon"
              className="size-5 sm:size-6 mr-2"
            />
            Sold By <span className="font-bold not-italic ml-1">Amazon</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6">
            <Button
              variant={"secondary"}
              // size={"lg"}
              className="flex-1 flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <FaShoppingCart /> Shop now at Amazon
            </Button>
            <div className="flex justify-center sm:justify-start gap-3">
              <Button
                size={"icon"}
                variant={"outline"}
                className="text-secondary border-secondary"
              >
                <HeartIcon />
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className="text-secondary border-secondary"
              >
                <Share2Icon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Storefront Info */}
      <section className="mt-12 border-2 border-secondary rounded-lg py-8 sm:py-12 px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-start items-center sm:items-start gap-6">
        <Avatar className="size-[90px] sm:size-[100px] md:size-[120px]">
          <AvatarImage src={"https://avatar.iran.liara.run/public"} />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left space-y-2">
          <p className="text-sm">Curated by</p>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            AnnaStyle’s Storefront
          </h2>
          <p className="text-sm max-w-md">
            Your source for timeless fashion finds and curated collections
          </p>
          <Button
            variant={"link"}
            className="px-0 hover:gap-4 text-secondary text-base sm:text-lg font-semibold"
            asChild
          >
            <Link href={"/store"}>
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
          <Prods amm={4} />
        </div>
      </section>
    </main>
  );
}
