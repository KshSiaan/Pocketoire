import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PenIcon } from "lucide-react";
import Image from "next/image";

export default function EditProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="hover:text-secondary hover:bg-secondary/20"
          size={"icon"}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none! min-w-1/2! max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl italic">Edit Product</DialogTitle>
          <DialogDescription className="text-lg">
            Add a new affiliate product to your store
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Media & Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Label>Product Image </Label>
              <Input type="file" className="rounded-none" />
              <Label>Affiliate Link * </Label>
              <Input
                className="rounded-none"
                placeholder="https://example.example"
              />
              <div className="border-1 border-dashed border-secondary p-4 rounded-lg">
                <div className="flex justify-between items-center gap-6 h-24">
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
                    <p>Retailer Name</p>
                    <p>
                      <span className="font-bold">$299</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Label>Product Name *</Label>
              <Input className="rounded-none" placeholder="example name" />
              <Label>Description *</Label>
              <Textarea
                className="resize-none h-24"
                placeholder="enter product name"
              />
              <div className="w-full grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Album *</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Album" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dum1">Dummy Item</SelectItem>
                      <SelectItem value="dum2">Dummy Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Commission Rate (%)</Label>
                  <Input type="number" placeholder="5%" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-full grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Current Price ($) *</Label>
                  <Input type="number" placeholder="5$" />
                </div>
                <div className="space-y-2">
                  <Label>Original Price ($) *</Label>
                  <Input type="number" placeholder="5$" />
                  <p className="text-xs">Leave empty if no discount</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} className="border-primary">
              Cancel
            </Button>
          </DialogClose>
          <Button variant={"secondary"}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
