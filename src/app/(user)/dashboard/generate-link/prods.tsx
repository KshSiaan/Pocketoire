import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import {
  BanknoteIcon,
  CopyIcon,
  LinkIcon,
  MousePointerClickIcon,
} from "lucide-react";
import Image from "next/image";
import LinkGenerator from "./link-generator";

export default function Prods({
  data,
}: {
  data?: {
    product_code: string;
    name: string;
    price: number;
    currency: string;
    images: Array<string>;
    rating: number;
    url: string;
  }[];
}) {
  return data?.map((item, i) => (
    <Card
      className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform"
      key={i}
    >
      <CardHeader className="px-0!">
        <Image
          src={item.images[0]}
          alt="product"
          height={500}
          width={500}
          className="aspect-video object-cover object-center rounded-lg"
        />
      </CardHeader>
      <CardHeader className="px-0!">
        <CardTitle>{item.name}</CardTitle>
        <p className="text-secondary">Viator</p>
        <div className="flex items-center gap-6 text-xl">
          <p className="font-black">${item.price}</p>
          {/* <del className="font-light! opacity-80">$319.99</del> */}
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end items-center px-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant={"secondary"}>
              <LinkIcon />
              Generate Link
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[50dvw]">
            <DialogHeader>
              <DialogTitle>Generate Affiliate Link</DialogTitle>
            </DialogHeader>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="px-0!">
                <Image
                  src={item.images[0]}
                  alt="product"
                  height={500}
                  width={500}
                  className="aspect-video object-cover object-center rounded-lg"
                />
              </div>
              <div className="px-0!">
                <h4 className="text-xl font-semibold">{item.name}</h4>
                <p className="text-secondary"> Viator</p>
                <div className="flex items-center gap-6 text-xl">
                  <p className="font-black">${item.price}</p>
                </div>
              </div>
            </div>
            <p className="">Rating: {item.rating.toFixed(1)}/5 </p>
            <div className="mt-6">
              <Label className="text-lg">Your Affiliate Link</Label>

              <LinkGenerator url={item.url} />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  ));
}
