import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Stores({ amm }: { amm?: number }) {
  return Array(amm ?? 6)
    .fill("")
    .map((_, i) => (
      <Card
        className="border-destructive border-2 rounded-lg text-primary p-4!"
        key={i}
      >
        <CardHeader className="px-0! relative">
          <Image
            src={"/image/login.jpg"}
            alt="product"
            height={500}
            width={500}
            className="aspect-video object-cover object-center rounded-lg"
          />
          <Avatar className="absolute size-16 -bottom-8 border-4 border-destructive outline-4 outline-background">
            <AvatarImage src={"https://avatar.iran.liara.run/public"} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardHeader className="px-0! mt-6">
          <CardTitle className="text-primary font-bold text-xl">
            Annastyle
          </CardTitle>
          <CardDescription>By Anna</CardDescription>
          <p className="font-semibold text-secondary">124 Products</p>
          <div className="flex items-center gap-6 text-lg">
            <p className="font-light italic">
              A curated collection inspired by my favourite journeys, place and
              adventures.
            </p>
          </div>
        </CardHeader>
        <CardFooter className="px-0!">
          <Button size={"lg"} className="w-full" variant={"secondary"} asChild>
            <Link href={"/store"}>Visit Storefront</Link>
          </Button>
        </CardFooter>
      </Card>
    ));
}
