"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
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

export default function Header() {
  return (
    <header className="h-[60dvh] lg:h-[calc(100dvh-72px)] w-full p-4 sm:p-8 lg:p-12">
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
                  className="w-[600px] grid grid-cols-3 gap-6"
                  side="bottom"
                  align="end"
                >
                  <PopoverArrow className="fill-background" />
                  <div className="space-y-2">
                    <p>Filter by Retailer</p>
                    <Select>
                      <SelectTrigger className="w-full rounded-sm">
                        <SelectValue placeholder="Select Retailer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <p>Filter by Popularity</p>
                    <Select>
                      <SelectTrigger className="w-full rounded-sm">
                        <SelectValue placeholder="By Popularity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trending">Trending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <p>Sort By</p>
                    <Select>
                      <SelectTrigger className="w-full rounded-sm">
                        <SelectValue placeholder="Select Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fav">Nicole's favourite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full flex justify-end items-center gap-2 col-span-3">
                    <Button variant={"outline"} className="bg-transparent!">
                      Reset
                    </Button>
                    <Button variant={"destructive"}>Apply Filter</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                className="text-secondary"
                variant={"outline"}
                size={"icon"}
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
