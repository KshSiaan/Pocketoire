import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import Prods from "./prods";
import AddProduct from "./add-product";

export default function Page() {
  return (
    <main>
      <div className="w-full flex justify-between items-center ">
        <InputGroup className="bg-white rounded-none w-[400px]">
          <InputGroupInput placeholder="Search by product name, tags" />
          <InputGroupAddon align={"inline-end"}>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <AddProduct />
      </div>
      <div className="grid grid-cols-4 gap-6 mt-12">
        <Prods />
      </div>
    </main>
  );
}
