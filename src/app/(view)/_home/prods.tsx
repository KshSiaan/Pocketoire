import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default function Prods() {
  return Array(8)
    .fill("")
    .map((_, i) => (
      <Card
        className="border-destructive border-2 rounded-lg text-primary p-4!"
        key={i}
      >
        <CardHeader className="px-0!">
          <Image
            src={"/image/login.jpg"}
            alt="product"
            height={500}
            width={500}
            className="aspect-video object-cover object-center rounded-lg"
          />
        </CardHeader>
        <CardHeader className="px-0!">
          <CardTitle>Wireless Noise-Cancelling Headphones</CardTitle>
          <div className="flex items-center gap-6 text-xl">
            <p className="font-black">$299.99</p>
            <del className="font-light! opacity-80">$319.99</del>
          </div>
        </CardHeader>
      </Card>
    ));
}
