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
import {
  BanknoteIcon,
  CopyIcon,
  LinkIcon,
  MousePointerClickIcon,
} from "lucide-react";
import Image from "next/image";

export default function Prods({ amm }: { amm?: number }) {
  return Array(amm ?? 8)
    .fill("")
    .map((_, i) => (
      <Card
        className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform"
        key={i}
      >
        <CardHeader className="px-0!">
          <Image
            src={"/image/product.jpg"}
            alt="product"
            height={500}
            width={500}
            className="aspect-video object-cover object-center rounded-lg"
          />
        </CardHeader>
        <CardHeader className="px-0!">
          <CardTitle>Wireless Noise-Cancelling Headphones</CardTitle>
          <p className="text-secondary">Retailer: Amazon</p>
          <div className="flex items-center gap-6 text-xl">
            <p className="font-black">$299.99</p>
            <del className="font-light! opacity-80">$319.99</del>
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
                    src={"/image/product.jpg"}
                    alt="product"
                    height={500}
                    width={500}
                    className="aspect-video object-cover object-center rounded-lg"
                  />
                </div>
                <div className="px-0!">
                  <h4 className="text-xl font-semibold">
                    Wireless Noise-Cancelling Headphones
                  </h4>
                  <p className="text-secondary">Retailer: Amazon</p>
                  <div className="flex items-center gap-6 text-xl">
                    <p className="font-black">$299.99</p>
                    <del className="font-light! opacity-80">$319.99</del>
                  </div>
                </div>
              </div>
              <p className="">
                Premium over-ear headphones with active noise cancellation and
                30-hour battery life.Premium over-ear headphones with active
                noise cancellation and 30-hour battery life.
              </p>
              <div className="mt-6">
                <Label className="text-lg">Your Affiliate Link</Label>
                <div className="w-full flex items-center gap-4 mt-4">
                  <Input />
                  <Button variant={"secondary"}>
                    <CopyIcon />
                    Copy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    ));
}
