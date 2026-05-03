"use client";
import { makeImg } from "@/lib/utils";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
// interface ExploreProductType extends ProductType {
//   product_image: {
//     id: number;
//     product_id: number;
//     image: string;
//     source: string;
//     created_at: string;
//     updated_at: string;
//   } | null;
// }

export default function Prodss({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    storefront_id: number;
    album_id: number;
    source: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    product_link: string;
    viator_product_code?: string;
    status: string;
    created_at: string;
    updated_at: string;
    slug?: string;
    clicks_count: number;
    sales_count: number;
    storefront: {
      id: number;
      user_id: number;
      name: string;
      slug: string;
      user: {
        id: number;
        name: string;
      };
    };
    product_image: {
      id: number;
      product_id: number;
      image: string;
      source: string;
      created_at: string;
      updated_at: string;
    };
  }[];
}) {
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
          href={`/storefront/${prod?.storefront?.slug}/product/${prod.slug}`}
          key={prod.id}
          className="block h-full"
        >
          <Card className="h-full border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform">
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
            <CardHeader className="px-0! flex-1 flex flex-col">
              <CardTitle className="leading-6 line-clamp-3 min-h-[4.5rem]">
                {prod.title}
              </CardTitle>
              <div className="mt-auto flex w-full justify-between items-center gap-6 text-xl">
                <p className="font-black">${prod.price}</p>{" "}
                <Badge variant={"outline"}>{prod.source}</Badge>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </>
  );
}
