import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
export default function Brands() {
  return (
    <Carousel
      opts={{
        align: "start",
        active: true,
        loop: true,
      }}
      className="w-full!"
    >
      <CarouselContent>
        {Array.from({ length: 16 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/8">
            <div className="p-1 ">
              <Card className="border-0! shadow-none!">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={"/image/amazon.png"}
                    height={264}
                    width={264}
                    alt="brand"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
