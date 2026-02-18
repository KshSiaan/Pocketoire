"use client";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import Prods from "../../_home/prods";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "@/hooks/use-debounce-value";
export default function Prodss() {
  const [minMax, setMinMax] = useState([0, 100000]);
  const [debouncedMinMax, setDebouncedMinMax] = useDebounceValue(minMax, 500);
  const [search, setSearch] = useDebounceValue("", 500);
  const [sort, setSort] = useState("");

  //   const { data, isPending } = useQuery({
  //     queryKey: ["store_prods"],
  //   });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setDebouncedMinMax(minMax);
  }, [minMax]);
  useEffect(() => {
    console.log(search);
  }, [search]);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
      {/* Sidebar Filters */}
      <div className="border-t pt-6 flex flex-col gap-6">
        <Label className="text-lg sm:text-xl uppercase">Price Range</Label>
        <DualRangeSlider
          value={minMax}
          onValueChange={setMinMax}
          min={0}
          max={100000}
          step={1}
        />
        {JSON.stringify(debouncedMinMax)}
        <div className="w-full grid grid-cols-2 gap-2">
          <Input
            placeholder="Min price"
            className="bg-white rounded-none"
            type="number"
            value={minMax[0]}
            onChange={(e) => {
              const newMin = Number(e.target.value);
              if (newMin <= minMax[1]) {
                setMinMax([newMin, minMax[1]]);
              }
            }}
          />
          <Input
            placeholder="Max price"
            className="bg-white rounded-none"
            type="number"
            value={minMax[1]}
            onChange={(e) => {
              const newMax = Number(e.target.value);
              if (newMax >= minMax[0]) {
                setMinMax([minMax[0], newMax]);
              }
            }}
          />
        </div>

        {/* <div>
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
        </div> */}
      </div>

      {/* Products */}
      <div className="col-span-1 lg:col-span-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <InputGroup className="border-destructive rounded-none bg-white w-full md:w-[400px]">
            <InputGroupInput
              placeholder="Search by product name, tags"
              onChange={(e) => setSearch(e.target.value)}
            />
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
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="oldest">Oldest Arrivals</SelectItem>
                <SelectItem value="title_asc">Title: A to Z</SelectItem>
                <SelectItem value="title_desc">Title: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <Suspense>
            <Prods />
          </Suspense> */}
        </div>
        {search}
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
  );
}
