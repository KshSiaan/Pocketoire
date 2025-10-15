"use client";

import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRightIcon,
  BoxesIcon,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
} from "lucide-react";
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
import Header from "@/components/core/header";
import Stores from "../storefronts/stores";
import Link from "next/link";

export default function Page() {
  const [values, setValues] = useState([0, 100]);
  return (
    <>
      <Header
        title="Explore Amazing Products"
        desc="Discover curated products from top creators and find your next favorite item"
      />
      <main className="p-12 mt-12">
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
          </div>
        </section>
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
        <section className="mt-12">
          <h1 className="text-center font-bold text-4xl italic">
            Featured Storefronts
          </h1>
          <div className="w-full grid grid-cols-4 gap-6 mt-12">
            <Stores amm={4} />
          </div>
        </section>
        <div className="mt-12 flex justify-center">
          <Button
            className="px-12! py-6 border-secondary border-2 text-base text-secondary"
            variant={"outline"}
            size={"lg"}
            asChild
          >
            <Link href={"/storefronts"}>
              Browse Stores <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
