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
      <main className="italic px-8 lg:px-16 py-12 space-y-10 text-primary">
        <section className="space-y-6">
          <h2 className="text-4xl font-semibold">What Drives Us</h2>
          <p className="text-xl leading-relaxed">
            <strong>Our Mission:</strong> To empower creators and influencers by
            providing the simplest, most elegant platform to build a business
            through affiliate marketing.
          </p>
          <p className="text-xl leading-relaxed">
            <strong>Our Vision:</strong> A world where anyone with a passion can
            connect great products with the right audience and earn a
            sustainable income.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-4xl font-semibold">
            Why We Created This Platform
          </h2>
          <p className="text-xl leading-relaxed">
            We saw a gap in the market — talented curators, bloggers, and
            influencers needed a tool that was more than just a list of links.
            They needed a beautiful, personalized storefront to showcase their
            favorite products. That’s why we built this platform: to give you a
            digital home for your recommendations.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6 text-xl leading-relaxed">
            <ul className="list-disc list-outside space-y-6 pl-6">
              <li>
                <strong>For Affiliates:</strong> We provide easy-to-use tools to
                create stunning storefronts, add products in seconds, and track
                your earnings transparently — no coding, no hassle.
              </li>
              <li>
                <strong>For Buyers:</strong> We offer a curated shopping
                experience where you can discover amazing products recommended
                by people you trust, and purchase securely from top retailers.
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5 relative aspect-video">
            <Image
              src="/image/about.jpg"
              alt="About Us"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </section>

        <p className="text-xl leading-relaxed pt-6">
          We believe in connecting great products with the right audience — it’s
          that simple.
        </p>
      </main>
    </>
  );
}
