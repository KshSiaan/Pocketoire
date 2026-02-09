import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { howl, makeImg } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { ProductType } from "@/types/global";
import Image from "next/image";
import Link from "next/link";
export interface expandedProductType extends ProductType {
  product_image: {
    id: number;
    product_id: number;
    image: string;
    source: string;
    created_at: string;
    updated_at: string;
  };
}
export default async function ProductSection({
  datas,
}: {
  datas?: expandedProductType[];
}) {
  return datas?.map((prod, i) => (
    <Link href={`/store/${prod?.storefront_id}/product/${prod?.id}`} key={i}>
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
  ));
}
