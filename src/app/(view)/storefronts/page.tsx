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
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Page() {
  return (
    <>
      <header className="h-[500px] bg-primary relative pt-12">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-6xl text-background font-semibold italic">
            Browse Inspiring Storefronts
          </h1>
          <p className="mt-6 text-2xl font-semibold text-background">
            Explore unique shops from creators worldwide and uncover hidden gems
            tailored for you.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-[280px]">
          <Image
            src="/extra/header.svg"
            alt="header_style"
            fill
            className="object-cover object-bottom"
          />
        </div>
      </header>

      <main className="mt-12 p-12">
        <div className="w-full flex justify-between items-center">
          <InputGroup className="w-[400px] bg-white rounded-none!">
            <InputGroupInput placeholder="Search by Store Name" />
            <InputGroupAddon align={"inline-end"}>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <div className="w-full flex justify-end gap-6 items-center">
            <p>Sort by:</p>
            <Select>
              <SelectTrigger className="w-[240px] bg-white rounded-none">
                <SelectValue placeholder="Most Popular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-6 mt-12">
          <Card
            className="border-destructive border-2 rounded-lg text-primary p-4!"
            // key={i}
          >
            <CardHeader className="px-0! relative">
              <Image
                src={"/image/login.jpg"}
                alt="product"
                height={500}
                width={500}
                className="aspect-video object-cover object-center rounded-lg"
              />
              <Avatar className="absolute size-16 -bottom-8 border-4 border-destructive outline-4 outline-background">
                <AvatarImage />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardHeader className="px-0! mt-6">
              <CardTitle className="text-primary font-bold text-xl">
                Annastyle
              </CardTitle>
              <div className="flex items-center gap-6 text-xl">
                <p className="font-black">$299.99</p>
                <del className="font-light! opacity-80">$319.99</del>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
