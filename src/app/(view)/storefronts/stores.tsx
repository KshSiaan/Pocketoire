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
import { makeImg } from "@/lib/utils";
export default function Stores({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    name: string;
    bio: string;
    total_sold: number;
    total_products: number;
    user: {
      id: number;
      name: string;
      profile_photo: string;
      cover_photo: string;
    };
  }[];
}) {
  return data?.map((store, i) => (
    <Card
      className="border-destructive border-2 rounded-lg text-primary p-4!"
      key={i}
    >
      <CardHeader className="px-0! relative">
        <Image
          src={
            store.user.cover_photo
              ? makeImg(`storage/${store.user.cover_photo}`)
              : "/image/login.jpg"
          }
          unoptimized
          alt="product"
          height={500}
          width={500}
          className="aspect-video object-cover object-center rounded-lg"
        />
        <Avatar className="absolute size-16 -bottom-7 left-4 border-4 border-destructive outline-4 outline-background">
          <AvatarImage
            src={
              store.user.profile_photo
                ? makeImg(`storage/${store.user.profile_photo}`)
                : "https://avatar.iran.liara.run/public"
            }
          />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardHeader className="px-0! mt-6">
        <CardTitle className="text-primary font-bold text-xl">
          {store.name}
        </CardTitle>
        <CardDescription>By {store.user.name}</CardDescription>
        <p className="font-semibold text-secondary">
          {store.total_products} Products
        </p>
        <div className="flex items-center gap-6 text-lg">
          <p className="font-light italic">
            {store?.bio?.length > 100
              ? store.bio.slice(0, 100) + "..."
              : store.bio || "No description provided"}
          </p>
        </div>
      </CardHeader>
      <CardFooter className="px-0!">
        <Button size={"lg"} className="w-full" variant={"secondary"} asChild>
          <Link href={`/store/${store.id}`}>Visit Storefront</Link>
        </Button>
      </CardFooter>
    </Card>
  ));
}
