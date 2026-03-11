import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { howl, makeImg } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import type { ProductType } from "@/types/global";
import Image from "next/image";
import Link from "next/link";
interface expandedProductType extends ProductType {
  product_image: {
    id: number;
    product_id: number;
    image: string;
    source: string;
    created_at: string;
    updated_at: string;
  };
}
export default async function Prods({ amm }: { amm?: number }) {
  const data: ApiResponse<expandedProductType[]> =
    await howl("/products/featured");
  return data?.data.slice(0, amm).map((prod, i) => (
    <Link
      href={`/store/${prod?.storefront?.slug}/product/${prod?.slug}`}
      key={i}
      className="block h-full"
    >
      <Card className="h-full border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform">
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
        <CardHeader className="flex-1 content-start px-0!">
          <CardTitle>{prod.title}</CardTitle>
          <div className="mt-auto flex items-center gap-6 text-xl">
            <p className="font-black">${prod.price}</p>
            {/* <del className="font-light! opacity-80">$319.99</del> */}
          </div>
        </CardHeader>
      </Card>
    </Link>
  ));
}
