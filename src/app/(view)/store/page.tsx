"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoxesIcon, ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
import Prods from "../_home/prods";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
export default function Page() {
  const [values, setValues] = useState([0, 100]);
  return (
    <>
      <header className="h-[50dvh] p-6 mb-[120px]">
        <div className="w-full h-full bg-primary rounded-lg relative">
          <Image
            src={"/image/cover.jpg"}
            fill
            alt="cover_photo"
            className="object-cover rounded-lg"
          />
          <Avatar className="absolute size-[220px] -bottom-[110px] left-[110px] border-4 border-destructive outline-4 outline-background z-50">
            <AvatarImage src={"https://avatar.iran.liara.run/public"} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="px-12">
        <section className="px-20 space-y-4 mb-12">
          <span className="flex items-start gap-2">
            <h1 className="text-4xl font-bold mr-6">
              Tech & Lifestyle Essentials
            </h1>
            <Button
              variant={"ghost"}
              className="bg-secondary/20 text-secondary rounded-full"
              size={"icon"}
            >
              <FaInstagram />
            </Button>
            <Button
              variant={"ghost"}
              className="bg-secondary/20 text-secondary rounded-full"
              size={"icon"}
            >
              <FaTiktok />
            </Button>
          </span>
          <span className="flex items-center gap-4">
            <p className="text-xl">by John doe</p>
            <BoxesIcon className="text-secondary" />{" "}
            <p className="text-secondary font-semibold text-lg">122 Products</p>
          </span>
          <h4 className="text-2xl font-bold">About This Store</h4>
          <p className="text-lg">
            Curated collection of the best tech gadgets and lifestyle products I
            personally use and recommend.
          </p>
        </section>
        <section className="grid grid-cols-4 gap-6 pb-12">
          <div className="col-span-1 border-t pt-6 flex flex-col gap-6">
            <Label className="text-xl uppercase">Price Range</Label>
            <DualRangeSlider
              // label={(value) => <span>{value}℃</span>}
              value={values}
              onValueChange={setValues}
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
            <Label className="text-xl uppercase">Popular Brands</Label>
            <div className="w-full grid grid-cols-2 gap-6">
              {[
                "Apple",
                "Google",
                "Microsoft",
                "Samsung",
                "Dell",
                "HP",
                "Symphony",
                "Xiaomi",
                "Sony",
                "Panasonic",
                "LG",
                "Intel",
                "One Plus",
              ].map((brand) => (
                <div key={brand} className="flex items-center gap-3">
                  <Checkbox
                    value={brand.toLowerCase()}
                    id={brand.toLowerCase()}
                  />
                  <Label htmlFor={brand.toLowerCase()}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <div className="w-full flex justify-between items-center">
              <InputGroup className="border-destructive rounded-none bg-white w-[400px]">
                <InputGroupInput placeholder="Search by product name, tags" />
                <InputGroupAddon align={"inline-end"}>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
              <div className="flex items-center gap-4">
                <Label htmlFor="sorter">Sort by:</Label>
                <Select>
                  <SelectTrigger className="border-destructive rounded-none bg-white">
                    <SelectValue placeholder="Select Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6">
              <Prods />
            </div>
            <div className="mt-24">
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="text-secondary border-secondary rounded-full! border">
                    <PaginationLink href="#" className="rounded-full!">
                      <ChevronLeft />
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="bg-destructive rounded-full border text-background">
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="bg-white rounded-full border">
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="bg-white rounded-full border">
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>

                  <PaginationItem className="text-secondary border-secondary rounded-full! border">
                    <PaginationLink href="#" className="rounded-full!">
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
