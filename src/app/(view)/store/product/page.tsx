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
    <main className="p-12">
      <div className="grid grid-cols-2 gap-6">
        <Image
          src="/image/product.jpg"
          height={500}
          width={800}
          alt="product"
          className="aspect-video rounded-lg w-full"
        />
        <div className="">
          <h1 className="text-4xl font-bold italic">
            Wireless Noise-Cancelling Headphones
          </h1>
          <span className="flex items-center gap-6 mt-6">
            <p className="text-4xl font-bold italic">$299.99</p>
            <del className="text-3xl italic text-muted-foreground">$399.99</del>
          </span>
          <p className="mt-6 text-lg">
            Premium over-ear headphones with active noise cancellation and
            30-hour battery life.Premium over-ear headphones with active noise
            cancellation and 30-hour battery life.
          </p>
          <div className="bg-[#F0ECE2] flex justify-start items-center p-4 mt-6 gap-2 italic ">
            <Image
              src={"/extra/amazon.png"}
              height={64}
              width={64}
              alt="amazon_icon"
              className="size-6 mr-2"
            />{" "}
            Sold By <span className="font-bold not-italic">Amazon</span>
          </div>
          <div className="flex justify-between items-center gap-2 mt-6">
            <Button variant={"secondary"} size={"lg"} className="flex-1">
              <FaShoppingCart /> Shop now at Amazon
            </Button>
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
      <section className="mt-12 border-2 border-secondary rounded-lg py-12 px-12 flex justify-start items-start gap-6">
        <Avatar className="size-[120px]">
          <AvatarImage src={"https://avatar.iran.liara.run/public"} />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <p className="text-sm">Curated by</p>
          <h2 className="text-3xl">AnnaStyle’s Storrefornt</h2>
          <p className="text-sm">
            Your source for timeless fashion finds and curated collections
          </p>
          <Button
            variant={"link"}
            className="px-0! hover:gap-4 text-secondary! text-lg font-semibold"
            asChild
          >
            <Link href={"/store"}>
              View all product from this storefront <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </section>
      <section className="mt-24">
        <h2 className="text-4xl italic">
          More from Tech & Lifestyle Essentials
        </h2>
        <div className="mt-12 grid grid-cols-4 gap-6">
          <Prods amm={4} />
        </div>
      </section>
    </main>
  );
}
