import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { howl } from "@/lib/utils";
import { ApiResponse, Paginator } from "@/types/base";
import { CheckIcon, EyeIcon, Flag, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data: ApiResponse<
    Paginator<
      {
        id: number;
        user_id: number;
        storefront_id: number;
        title: string;
        status: string;
        product_link: string;
        storefront: {
          id: number;
          name: string;
        };
        user: {
          id: number;
          name: string;
        };
        product_image: {
          id: number;
          product_id: number;
          image: string;
          source: string;
          created_at: string;
          updated_at: string;
        };
      }[]
    >
  > = await howl(`/admin/products`, {
    token,
  });
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
              <InputGroupInput placeholder="Search product...." />
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
              {data?.data?.data?.map((product, index) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.storefront.name}</TableCell>
                  <TableCell>{product.user.name}</TableCell>
                  <TableCell>
                    {product.status === "approved" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100/90 font-normal">
                        {product.status}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100/90 font-normal">
                        {product.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className=" space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                      asChild
                    >
                      <Link
                        href={`/store/${product.storefront.id}/product/${product.id}`}
                      >
                        <EyeIcon className="h-4 w-4 text-gray-700" />
                      </Link>
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
