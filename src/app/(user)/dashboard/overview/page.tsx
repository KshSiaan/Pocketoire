"use client";
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
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<{
      totals: {
        products: {
          total: number;
          change_percent: number;
        };
        clicks: {
          total: number;
          change_percent: number;
        };
        earnings: {
          total: number;
          change_percent: number;
        };
      };
      recent_products: Array<{
        id: number;
        title: string;
        clicks: number;
        earnings: number;
      }>;
      albums: Array<{
        name: string;
        description: string;
        products_count: number;
        total_clicks: number;
        total_earnings: number | string | null;
      }>;
    }> => {
      return howl(`/creator/home`, {
        token,
      });
    },
  });
  const stats = [
    {
      title: "Total Products",
      value: isPending ? "Loading..." : data?.totals.products.total || 0,
      icon: PackageIcon,
      change: "+2 this week",
      changeColor: "text-green-500",
    },
    {
      title: "Total Sales",
      value: isPending ? "Loading..." : data?.totals.earnings.total || 0,
      icon: Banknote,
      change: "+12 this week",
      changeColor: "text-green-500",
    },
    {
      title: "Total Clicks",
      value: isPending ? "Loading..." : data?.totals.clicks.total || 0,
      icon: MousePointerClick,
      change: "-80 this week",
      changeColor: "text-red-500",
    },
    {
      title: "Total Earnings",
      value: isPending ? "Loading..." : data?.totals.earnings.total || 0,
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
          {data?.recent_products?.map((product, i) => (
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
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="space-x-6">
                  <span className="font-bold">${product.earnings}</span>
                  {/* <span>(8.5% commission)</span> */}
                </p>
              </div>
              <div className="">
                <Badge variant={"outline"} className="px-4 py-2">
                  {product.clicks} Clicks
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
              {data?.albums?.map((album, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">{album.name}</TableCell>
                  <TableCell className="text-center">
                    {album?.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {album?.products_count}
                  </TableCell>
                  <TableCell className="text-center">
                    {album?.total_clicks}
                  </TableCell>
                  <TableCell className="text-center font-bold text-green-500">
                    ${Number(album?.total_earnings ?? 0).toFixed(2)}
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
