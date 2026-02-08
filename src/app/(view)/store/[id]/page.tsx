import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoxesIcon, ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Prods from "@/app/(view)/_home/prods";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cookies } from "next/headers";
import { howl, makeImg } from "@/lib/utils";
import { ApiResponse, Paginator } from "@/types/base";
import { ProductType } from "@/types/global";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = (await cookies()).get("token")?.value;
  const data: ApiResponse<{
    profile: {
      store_name: string;
      bio: string;
      profile_photo: string;
      cover_photo: string;
      store_slug: string;
      instagram: any;
      tiktok: any;
      total_products: number;
    };
    products: Paginator<ProductType[]>;
  }> = await howl(`/storefront/${id}/profile`);
  return (
    <>
      {/* Header */}
      <header className="h-[50dvh] p-4 sm:p-6 mb-[120px] relative">
        <div className="w-full h-full bg-primary rounded-lg relative">
          <Image
            src={
              data?.data?.profile?.cover_photo
                ? makeImg(`storage/${data?.data?.profile?.cover_photo}`)
                : "/image/cover.jpg"
            }
            fill
            unoptimized
            alt="cover_photo"
            className="object-cover rounded-lg"
          />
          <Avatar className="absolute size-[150px] sm:size-[180px] md:size-[220px] -bottom-[75px] sm:-bottom-[90px] md:-bottom-[110px] left-1/2 md:left-[110px] -translate-x-1/2 md:translate-x-0 border-4 border-destructive outline-4 outline-background z-50">
            <AvatarImage
              src={
                data?.data?.profile?.profile_photo
                  ? makeImg(`storage/${data?.data?.profile?.profile_photo}`)
                  : "https://avatar.iran.liara.run/public"
              }
            />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12">
        {/* Store Info */}
        <section className="px-0 sm:px-10 lg:px-20 space-y-4 mb-12 text-center md:text-left">
          <span className="flex flex-col md:flex-row md:items-start gap-4 md:gap-2 justify-center md:justify-start">
            <h1 className="text-3xl sm:text-4xl font-bold mr-0 md:mr-6">
              {data?.data?.profile?.store_name || "N/A"}
            </h1>
            <div className="flex justify-center md:justify-start gap-3">
              {data?.data?.profile?.instagram && (
                <Button
                  variant={"ghost"}
                  className="bg-secondary/20 text-secondary rounded-full"
                  size={"icon"}
                  asChild
                >
                  <Link href={data?.data?.profile?.instagram || "#"}>
                    <FaInstagram />
                  </Link>
                </Button>
              )}
              {data?.data?.profile?.tiktok && (
                <Button
                  variant={"ghost"}
                  className="bg-secondary/20 text-secondary rounded-full"
                  size={"icon"}
                  asChild
                >
                  <Link href={data?.data?.profile?.tiktok || "#"}>
                    <FaTiktok />
                  </Link>
                </Button>
              )}
            </div>
          </span>

          <span className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4">
            <p className="text-lg sm:text-xl">by N/A</p>
            <span className="flex items-center gap-2">
              <BoxesIcon className="text-secondary w-5 h-5" />
              <p className="text-secondary font-semibold text-base sm:text-lg">
                {data?.data?.profile?.total_products || 0} Products
              </p>
            </span>
          </span>

          <h4 className="text-xl sm:text-2xl font-bold">About This Store</h4>
          <p className="text-base sm:text-lg max-w-2xl mx-auto md:mx-0">
            {data?.data?.profile?.bio ||
              "No description provided for this store."}
          </p>
        </section>

        {/* Filters + Products */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
          {/* Sidebar Filters */}
          <div className="border-t pt-6 flex flex-col gap-6">
            <Label className="text-lg sm:text-xl uppercase">Price Range</Label>
            <DualRangeSlider
              // value={values}
              // onValueChange={setValues}
              min={0}
              max={100}
              step={1}
            />

            <div className="w-full grid grid-cols-2 gap-2">
              <Input
                placeholder="Min price"
                className="bg-white rounded-none"
                type="number"
              />
              <Input
                placeholder="Max price"
                className="bg-white rounded-none"
                type="number"
              />
            </div>

            <div>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">All Price</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Under $20</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r3" id="r3" />
                  <Label htmlFor="r3">$25 to $100</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r4" id="r4" />
                  <Label htmlFor="r4">$500 to $1,000</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r5" id="r5" />
                  <Label htmlFor="r5">$1,000 to $10,000</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <Label className="text-lg sm:text-xl uppercase">
              Popular Brands
            </Label>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                "Hotels",
                "Restaurants",
                "Activities",
                "Vacation rentals",
                // "Dell",
                // "HP",
                // "Symphony",
                // "Xiaomi",
                // "Sony",
                // "Panasonic",
                // "LG",
                // "Intel",
                // "One Plus",
              ].map((brand) => (
                <div key={brand} className="flex items-center gap-2 sm:gap-3">
                  <Checkbox
                    value={brand.toLowerCase()}
                    id={brand.toLowerCase()}
                  />
                  <Label htmlFor={brand.toLowerCase()}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <InputGroup className="border-destructive rounded-none bg-white w-full md:w-[400px]">
                <InputGroupInput placeholder="Search by product name, tags" />
                <InputGroupAddon align={"inline-end"}>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>

              <div className="flex items-center gap-3 md:gap-4">
                <Label htmlFor="sorter" className="whitespace-nowrap">
                  Sort by:
                </Label>
                <Select>
                  <SelectTrigger className="border-destructive rounded-none bg-white w-[180px]">
                    <SelectValue placeholder="Select Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Prods />
            </div>

            <div className="my-16 sm:my-24 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="text-secondary border-secondary border rounded-full">
                    <PaginationLink href="#" className="rounded-full">
                      <ChevronLeft />
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="bg-destructive text-background rounded-full border">
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="bg-white rounded-full border">
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="bg-white rounded-full border">
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="text-secondary border-secondary border rounded-full">
                    <PaginationLink href="#" className="rounded-full">
                      <ChevronRight />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
