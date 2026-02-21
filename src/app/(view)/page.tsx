import { Button } from "@/components/ui/button";
import Header from "./_home/header";
import { ArrowRightIcon } from "lucide-react";
import SubColumn from "./_home/sub-column";
import Brands from "./_home/brands";
import Prods from "./_home/prods";
import Link from "next/link";
import { Suspense } from "react";
import CreateStore from "./_home/create_store";

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4 lg:p-12">
        <section className="">
          <h2 className="text-center text-4xl italic">
            Your taste inspires others-now <br />
            let it reward you.
          </h2>
        </section>
        <section className="w-full grid lg:grid-cols-3 gap-6 mt-12">
          <SubColumn />
        </section>
        <section className="mb-12">
          <div className="flex justify-between items-center mt-12">
            <h2 className="text-lg lg:text-3xl font-semibold italic">
              Featured Products
            </h2>
            <Button variant={"outline"}>
              View All <ArrowRightIcon />
            </Button>
          </div>
          <div className="w-full py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Prods />
          </div>
        </section>
        <section className="px-8 lg:px-0">
          <h3 className="font-semibold text-center text-2xl">
            Shop by Location
          </h3>
          <div className="w-10/11 mx-auto">
            <Suspense>
              <Brands />
            </Suspense>
          </div>
        </section>
      </main>
      <div className="w-full bg-primary p-12 px-0!">
        <h3 className="text-center text-sm lg:text-3xl text-background font-semibold">
          Have products to share? Open your Pocketoire storefront <br /> and
          start earning today.
        </h3>
        <div className="flex items-center justify-center gap-2 mt-6">
          <CreateStore />
          <Button className="border-2 border-background" asChild>
            <Link href={"/storefronts"}>Browse Stores</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
