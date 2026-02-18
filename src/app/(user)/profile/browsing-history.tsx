"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { makeImg } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

export default function BrowsingHistory() {
  const [{ historyToken }] = useCookies(["historyToken"]);

  const historyData: {
    id: number;
    title: string;
    image: string;
    price: string;
    currency: string;
    store: {
      id: number;
      name: string;
    };
  }[] = historyToken;

  return historyData?.map((x) => (
    <Card className="border-2 border-secondary" key={x.id}>
      <CardContent className="flex justify-start items-start w-full gap-6">
        <Image
          src={x.image ? makeImg(x.image) : "/placeholder.png"}
          height={600}
          width={900}
          alt="product_img"
          className="h-24 aspect-video! w-34 rounded-lg"
        />
        <div className="flex-1">
          <h4 className="font-bold">{x.title}</h4>
          <p className="text-muted-foreground">By {x.store.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">${x.price}</p>
            <Button variant={"link"} className="text-secondary" asChild>
              <Link href={`/store/${x.store.id}/product/${x.id}`}>
                View Again <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
