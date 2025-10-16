import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckIcon,
  EyeIcon,
  Flag,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
export default function Page() {
  const productData = [
    {
      productName: "Luxury Paris Hotel",
      retailer: "Amazon",
      creator: "Lisa Journey",
      status: "Active",
    },
  ];
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl italic">Product Listings</CardTitle>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search users...." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Filter by Retailer" />
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-t">
                <TableHead className="italic">Product Name</TableHead>
                <TableHead className="italic">Retailer</TableHead>
                <TableHead className="italic">Creator</TableHead>
                <TableHead className="italic">Status</TableHead>
                <TableHead className=" italic">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.map((product, index) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="font-medium">
                    {product.productName}
                  </TableCell>
                  <TableCell>{product.retailer}</TableCell>
                  <TableCell>{product.creator}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100/90 font-normal">
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className=" space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <EyeIcon className="h-4 w-4 text-gray-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <CheckIcon className="h-4 w-4 text-gray-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <Flag className="h-4 w-4 text-gray-700" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
