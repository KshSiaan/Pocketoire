import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[60dvh] lg:h-[calc(100dvh-72px)] w-full p-4 sm:p-8 lg:p-12">
      <div
        className="h-full w-full bg-primary rounded-xl bg-cover bg-bottom"
        style={{ backgroundImage: `url('/image/header.jpg')` }}
      >
        <div className="h-full w-full bg-foreground/30 rounded-xl flex flex-col justify-center items-center py-8 sm:py-12 px-4">
          {/* Title Section */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl text-center text-background font-semibold leading-snug sm:leading-[60px] lg:leading-[74px]">
            Shop curated products on{" "}
            <span className="border-2 px-3 sm:px-4 py-1 border-background/80">
              Pocketoire
            </span>
            <br className="hidden sm:block" /> from creators & trusted brands
          </h1>

          {/* Search Bar */}
          <div className="w-full flex justify-center items-center mt-6 sm:mt-8">
            <div className="p-3 sm:p-4 border bg-white/30 backdrop-blur-sm w-full sm:w-4/5 lg:w-2/3 rounded-lg flex flex-row justify-between items-center gap-2">
              <Input
                className="flex-1 border-0 text-background placeholder:text-background/80 focus-visible:ring-0 bg-transparent"
                placeholder="Search for products or storefronts..."
              />
              <Button
                className="text-background hover:text-destructive"
                variant="ghost"
              >
                <SlidersHorizontalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button className="px-4 sm:px-6 lg:px-8" variant="secondary">
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
