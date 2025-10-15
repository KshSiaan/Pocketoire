import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BanknoteIcon,
  LinkIcon,
  MousePointerClickIcon,
  PenIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import EditProduct from "./edit";
export default function Prods({ amm }: { amm?: number }) {
  return Array(amm ?? 8)
    .fill("")
    .map((_, i) => (
      <Card
        className="border-destructive border-2 rounded-lg text-primary p-4! hover:scale-[102%] transition-transform"
        key={i}
      >
        <CardHeader className="px-0!">
          <Image
            src={"/image/product.jpg"}
            alt="product"
            height={500}
            width={500}
            className="aspect-video object-cover object-center rounded-lg"
          />
        </CardHeader>
        <CardHeader className="px-0!">
          <CardTitle>Wireless Noise-Cancelling Headphones</CardTitle>
          <div className="flex items-center gap-6 text-xl">
            <p className="font-black">$299.99</p>
            <del className="font-light! opacity-80">$319.99</del>
          </div>
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <MousePointerClickIcon />
              Clicks
            </p>
            <p>350</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <BanknoteIcon />
              Earnings
            </p>
            <p className="text-green-600">$350</p>
          </div>
        </CardHeader>
        <CardFooter className="border-t flex justify-end items-center px-0">
          <EditProduct />
          <Button
            variant={"ghost"}
            className="hover:text-secondary hover:bg-secondary/20"
            size={"icon"}
          >
            <LinkIcon />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"ghost"}
                className="hover:text-secondary hover:bg-secondary/20"
                size={"icon"}
              >
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-none">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You're about to delete this product. The action can not be
                  undone
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-none">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="rounded-none bg-secondary hover:bg-secondary/80">
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    ));
}
