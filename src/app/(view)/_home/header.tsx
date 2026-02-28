"use client";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PopoverArrow } from "@radix-ui/react-popover";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header() {
  const navig = useRouter();
  const [minMax, setMinMax] = React.useState<[number, number]>([0, 100000]);
  const [sort, setSort] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const goToExplore = React.useCallback(() => {
    const query = new URLSearchParams({
      search: search.trim(),
      sort,
      min_price: String(minMax[0]),
      max_price: String(minMax[1]),
    }).toString();

    navig.push(`/explore?${query}`);
  }, [minMax, navig, search, sort]);

  return (
    <header className="h-[50dvh] lg:h-[calc(100dvh-72px)] w-full p-4 sm:p-8 lg:p-12">
      <div
        className="h-full w-full bg-primary rounded-xl bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('/image/header.jpg')` }}
      >
        <div className="h-full w-full bg-foreground/30 rounded-xl flex flex-col justify-center items-center py-8 sm:py-12 px-4">
          {/* Title Section */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl text-center text-background font-semibold leading-snug sm:leading-[60px] lg:leading-[74px]">
            <span className="text-4xl sm:text-5xl lg:text-7xl italic">
              Pocketoire
            </span>
            <br className="hidden sm:block" /> Earn while you explore.
          </h1>

          {/* Search Bar */}
          <div className="w-full flex justify-center items-center mt-6 sm:mt-8">
            <div className="p-3 sm:p-4 border bg-white/30 backdrop-blur-xs w-full sm:w-4/5 lg:w-2/3 rounded-lg flex flex-row justify-between items-center gap-2">
              <Input
                className="flex-1 border-0 text-background placeholder:text-background/80 focus-visible:ring-0 bg-transparent shadow-none! italic"
                placeholder="Search for products or storefronts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    goToExplore();
                  }
                }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="text-background hover:text-destructive"
                    variant="ghost"
                  >
                    <SlidersHorizontalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="lg:w-[600px] lg:grid lg:grid-cols-3 gap-6"
                  side="bottom"
                  align="end"
                >
                  <PopoverArrow className="fill-background" />
                  <div className="space-y-2">
                    <p>Sort By</p>
                    <Select value={sort} onValueChange={setSort}>
                      <SelectTrigger className="w-full rounded-sm">
                        <SelectValue placeholder="Select Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="price_low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price_high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                        <SelectItem value="oldest">Oldest Arrivals</SelectItem>
                        <SelectItem value="title_asc">Title: A to Z</SelectItem>
                        <SelectItem value="title_desc">
                          Title: Z to A
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-8 lg:col-span-2 pr-4">
                    <Label className="">Price Range</Label>
                    <DualRangeSlider
                      label={(value) => <span>{value}</span>}
                      value={minMax}
                      onValueChange={(val) => {
                        setMinMax(val as [number, number]);
                      }}
                      min={0}
                      max={100000}
                      step={1}
                    />
                  </div>
                  <div className="w-full flex justify-end items-center gap-2 mt-6 lg:mt-0 col-span-3">
                    <Button
                      variant={"outline"}
                      className="bg-transparent!"
                      onClick={() => {
                        setMinMax([0, 100000]);
                        setSort("all");
                        setSearch("");
                      }}
                    >
                      Reset
                    </Button>
                    <Button variant={"destructive"} onClick={goToExplore}>
                      Apply Filter
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                className="text-secondary"
                variant={"outline"}
                size={"icon"}
                onClick={goToExplore}
              >
                <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </div>

          <div className="h-2 sm:h-6" />
        </div>
      </div>
    </header>
  );
}
