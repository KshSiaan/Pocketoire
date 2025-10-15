import Header from "@/components/core/header";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <>
      <Header
        title="About Us"
        desc="Learn our story, values, and vision behind creating a platform that connects creators and customers."
      />
      <main className="italic p-12 space-y-6 text-primary!">
        <h2 className="text-4xl">What Drives Us</h2>
        <br />
        <p className="text-xl">
          Our Mission:  To empower creators and influencers by providing the
          simplest, most elegant platform to build a business through affiliate
          marketing.
        </p>
        <br />
        <p className="text-xl">
          Our Vision:  A world where anyone with a passion can connect great
          products with the right audience and earn a sustainable income.
        </p>
        <br />
        <h2 className="text-4xl">Why We Created This Platform</h2>
        <br />
        <p className="text-xl">
          We saw a gap in the market. Talented curators, bloggers, and
          influencers needed a tool that was more than just a list of links.
          They needed a beautiful, personalized storefront to showcase their
          favorite products. That's why we built this platform—to give you a
          digital home for your recommendations.
        </p>
        <br />
        <br />
        <br />
        <br />
        <h2 className="text-4xl">Why We Created This Platform</h2>
        <br />
        <div className="w-full grid grid-cols-11">
          <div className="col-span-6 px-6 text-xl">
            <ul className="list-outside list-disc space-y-6">
              <li>
                For Affiliates: We provide you with easy-to-use tools to create
                stunning storefronts, add products in seconds, and track your
                earnings transparently. No coding, no hassle.
              </li>
              <li>
                For Buyers: We offer a curated shopping experience. Discover
                amazing products recommended by people you trust, and purchase
                securely from top retailers.
              </li>
            </ul>
          </div>
          <div className="col-span-5 w-full h-full  aspect-video relative">
            <Image
              src={"/image/about.jpg"}
              fill
              alt="about_us"
              className="object-cover rounded-xl object-center"
            />
          </div>
        </div>
        <br />
        <br />
        <p className="text-xl">
          We believe in connecting great products with the right audience. It's
          that simple. 
        </p>
      </main>
    </>
  );
}
