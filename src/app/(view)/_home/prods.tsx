import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
export default function Prods({ amm }: { amm?: number }) {
  return Array(amm ?? 8)
    .fill("")
    .map((_, i) => (
      <Link href={"/store/product"} key={i}>
        <Card className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform">
          <CardHeader className="px-0!">
            <Image
              src={"/image/product.jpeg"}
              alt="product"
              height={500}
              width={500}
              className="aspect-video object-cover object-center rounded-lg"
            />
          </CardHeader>
          <CardHeader className="px-0!">
            <CardTitle>Hotel in Chicago</CardTitle>
            <div className="flex items-center gap-6 text-xl">
              <p className="font-black">$299.99</p>
              <del className="font-light! opacity-80">$319.99</del>
            </div>
          </CardHeader>
        </Card>
      </Link>
    ));
}
