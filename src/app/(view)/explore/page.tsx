"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
} from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import Header from "@/components/core/header";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import Prods from "../_home/prods";
import Stores from "../storefronts/stores";

export default function Page() {
  const [values, setValues] = useState([0, 100]);

  const brands = [
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
  ];

  return (
    <>
      <Header
        title="Explore Amazing Products"
        desc="Discover curated products from top creators and find your next favorite item."
      />

      <main className="px-8 lg:px-16 py-12 mt-12 space-y-16">
        {/* Filter + Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-12">
          {/* Sidebar Filters */}
          <aside className="border-t pt-6 flex flex-col gap-8">
            {/* Price Range */}
            <div>
              <Label className="text-xl uppercase font-semibold">
                Price Range
              </Label>
              <div className="mt-4">
                <DualRangeSlider
                  value={values}
                  onValueChange={setValues}
                  min={0}
                  max={100}
                  step={1}
                />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Input placeholder="Min" type="number" className="bg-white" />
                  <Input placeholder="Max" type="number" className="bg-white" />
                </div>
              </div>

              <RadioGroup defaultValue="comfortable" className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">All Prices</Label>
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

            {/* Brands */}
            <div>
              <Label className="text-xl uppercase font-semibold">
                Popular Brands
              </Label>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center gap-3">
                    <Checkbox id={brand.toLowerCase()} />
                    <Label htmlFor={brand.toLowerCase()}>{brand}</Label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search + Sort */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <InputGroup className="bg-white w-full lg:w-[400px] border">
                <InputGroupInput placeholder="Search by product name, tags..." />
                <InputGroupAddon align="inline-end">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>

              <div className="flex items-center gap-3">
                <Label htmlFor="sorter">Sort by:</Label>
                <Select>
                  <SelectTrigger className="bg-white border">
                    <SelectValue placeholder="Select Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Most Popular</SelectItem>
                    <SelectItem value="2">Newest</SelectItem>
                    <SelectItem value="3">Price: Low to High</SelectItem>
                    <SelectItem value="4">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Prods />
            </div>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationLink href="#">
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    className={`rounded-full ${
                      page === 1
                        ? "bg-destructive text-background"
                        : "bg-white border"
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink href="#">
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Storefronts */}
        <section className="mt-16 text-center">
          <h1 className="text-4xl font-bold italic">Featured Storefronts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Stores amm={4} />
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              className="px-12 py-6 border-2 text-base"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/storefronts">
                Browse Stores <ArrowRightIcon className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
