import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import React from "react";
import Prods from "./prods";

export default function Page() {
  return (
    <main>
      <h1>Generate Affiliate Link</h1>
      <div className="my-6 flex items-center gap-6">
        <InputGroup className="bg-white rounded-none w-[400px]">
          <InputGroupInput placeholder="Search by product name" />
          <InputGroupAddon align={"inline-end"}>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Select>
          <SelectTrigger className="bg-white rounded-none w-[25%]">
            <SelectValue placeholder="Select Retailers" />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger className="bg-white rounded-none w-[25%]">
            <SelectValue placeholder="Select Popularity" />
          </SelectTrigger>
        </Select>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        <Prods />
      </div>
    </main>
  );
}
