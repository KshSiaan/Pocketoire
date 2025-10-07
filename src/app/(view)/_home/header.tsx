import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[calc(100dvh-72px)] w-full p-12">
      <div
        className="h-full w-full bg-primary rounded-xl bg-cover bg-bottom"
        style={{ backgroundImage: `url('/image/header.png')` }}
      >
        <div className="h-full w-full bg-foreground/30 rounded-xl flex flex-col justify-between items-center py-12">
          <h1 className="text-6xl text-center text-background font-semibold leading-[74px]">
            Shop curated products on{" "}
            <span className="border-2 px-4">Pocketoire</span> <br /> from
            creators & trusted brands
          </h1>
          <div className="w-full flex justify-center items-center">
            <div className="p-4 bg-background w-2/3 rounded-lg flex flex-row justify-between items-center gap-2">
              <Input
                className="border-0! outline-0! ring-0! shadow-none!"
                placeholder="Search for products or storefronts..."
              />
              <Button className="text-destructive" variant={"ghost"}>
                <SlidersHorizontalIcon />
              </Button>
              <Button className="px-8!" variant={"secondary"}>
                <SearchIcon />
              </Button>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </header>
  );
}
