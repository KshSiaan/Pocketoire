import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Brands() {
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
        {[
          "Italy",
          "Japan",
          "Greece",
          "Paris",
          "Amsterdam",
          "France",
          "NYC",
          "London",
          "Mexico",
          "Portugal",
        ].map((x, index) => (
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/8">
            <div className="p-1">
              <Card className="border-0! shadow-none!">
                <CardContent className="flex aspect-square items-center justify-center p-6 text-2xl font-bold select-none">
                  {/* <Image
                    src={"/image/amazon.png"}
                    height={264}
                    width={264}
                    alt="brand"
                  /> */}
                  {x}
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
