import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PackageIcon,
  Banknote,
  MousePointerClick,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import CreateAlbum from "./create-album";

export default function Page() {
  const stats = [
    {
      title: "Total Products",
      value: 24,
      icon: PackageIcon,
      change: "+2 this week",
      changeColor: "text-green-500",
    },
    {
      title: "Total Sales",
      value: 150,
      icon: Banknote,
      change: "+12 this week",
      changeColor: "text-green-500",
    },
    {
      title: "Total Clicks",
      value: 1240,
      icon: MousePointerClick,
      change: "-80 this week",
      changeColor: "text-red-500",
    },
    {
      title: "Total Earnings",
      value: "$2,430",
      icon: DollarSign,
      change: "+$230 this week",
      changeColor: "text-green-500",
    },
  ];

  return (
    <main className="flex flex-col justify-start items-start gap-6">
      <div className="w-full grid grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon, change, changeColor }, i) => (
          <Card key={i} className="rounded-none">
            <CardHeader className="justify-between w-full flex items-start">
              <CardTitle>{title}</CardTitle>
              <Icon className="text-primary" />
            </CardHeader>
            <CardContent className="text-4xl">{value}</CardContent>
            <CardFooter>
              <CardDescription className={changeColor}>
                {change}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="rounded-none w-full">
        <CardHeader>
          <CardTitle className="text-xl italic text-primary font-semibold">
            Recent Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3)
            .fill("")
            .map((_, i) => (
              <div
                className="flex justify-between items-center gap-6 h-24"
                key={i}
              >
                <Image
                  height={128}
                  width={240}
                  alt="product_icon"
                  src={"/image/product.jpg"}
                  className="h-24 w-34 rounded-lg"
                />
                <div className="flex-1 h-full flex flex-col justify-between items-start">
                  <h3 className="text-lg font-bold">
                    Wireless Noise cancelling Headphones
                  </h3>
                  <p className="space-x-6">
                    <span className="font-bold">$299</span>
                    <span>(8.5% commission)</span>
                  </p>
                </div>
                <div className="">
                  <Badge variant={"default"} className="px-4 py-2">
                    Tech Gadget
                  </Badge>
                </div>
              </div>
            ))}
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} className="w-full border-primary">
            View All Products
          </Button>
        </CardFooter>
      </Card>
      <Card className="rounded-none w-full">
        <CardHeader className="flex w-full justify-between items-center">
          <CardTitle className="text-xl italic text-primary font-semibold">
            My Album
          </CardTitle>
          <CreateAlbum />
        </CardHeader>
        <CardContent>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Products</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(3)
                .fill("")
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center">Tech Gadgets</TableCell>
                    <TableCell className="text-center">
                      Latest gadgets and tech accessories
                    </TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">1,500</TableCell>
                    <TableCell className="text-center font-bold text-green-500">
                      $350.00
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
