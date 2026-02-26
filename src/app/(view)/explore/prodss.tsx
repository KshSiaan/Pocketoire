"use client";
import { makeImg } from "@/lib/utils";
import type { ProductType } from "@/types/global";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
interface ExploreProductType extends ProductType {
  product_image: {
    id: number;
    product_id: number;
    image: string;
    source: string;
    created_at: string;
    updated_at: string;
  } | null;
}

export default function Prodss({ data }: { data: ExploreProductType[] }) {
  if (!data.length) {
    return (
      <div className="lg:col-span-4 text-center py-16 text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <>
      {data.map((prod) => (
        <Link
          href={`/store/${prod.storefront_id}/product/${prod.id}`}
          key={prod.id}
        >
          <Card className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform">
            <CardHeader className="px-0!">
              <Image
                src={
                  prod.product_image?.image
                    ? makeImg(`${prod.product_image.image}`)
                    : "/image/product.jpeg"
                }
                alt={prod.title}
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
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </>
  );
}
