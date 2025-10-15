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
import Stores from "./stores";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Header from "@/components/core/header";
export default function Page() {
  return (
    <>
      <Header
        title="Browse Inspiring Storefronts"
        desc="Explore unique shops from creators worldwide and uncover hidden gems
          tailored for you."
      />
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
          <Stores />
        </div>
        <div className="mt-24">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
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
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </>
  );
}
