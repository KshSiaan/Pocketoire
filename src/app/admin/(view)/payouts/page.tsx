import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, CreditCardIcon, PlusIcon, XIcon } from "lucide-react";
import React from "react";

export default function Page() {
  const payments = [
    {
      creatorName: "Alex",
      storefront: "Alexstyle",
      balance: "$600",
      requested: "$400",
      split: "80/20",
      platformFee: "$100",
      status: "Pending",
    },
    {
      creatorName: "Alex",
      storefront: "Alexstyle",
      balance: "$600",
      requested: "$400",
      split: "80/20",
      platformFee: "$100",
      status: "Pending",
    },
    {
      creatorName: "Alex",
      storefront: "Alexstyle",
      balance: "$600",
      requested: "$400",
      split: "80/20",
      platformFee: "$100",
      status: "Pending",
    },
    {
      creatorName: "Alex",
      storefront: "Alexstyle",
      balance: "$600",
      requested: "$400",
      split: "80/20",
      platformFee: "$100",
      status: "Pending",
    },
    {
      creatorName: "Alex",
      storefront: "Alexstyle",
      balance: "$600",
      requested: "$400",
      split: "80/20",
      platformFee: "$100",
      status: "Pending",
    },
  ];
  return (
    <main>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Commission Settings</CardTitle>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-2 gap-6">
          <div>
            <h4>Global Commission Split</h4>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="space-y-4">
                <Label>Creartor (%)</Label>
                <Input placeholder="70" />
              </div>
              <div className="space-y-4">
                <Label>Platform (%)</Label>
                <Input placeholder="30" />
              </div>
            </div>
            <Button variant={"secondary"} className="mt-6 w-full">
              Update
            </Button>
          </div>
          <div className="">
            <h4>Global Commission Split</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Creator Name</TableHead>
                  <TableHead>Current Split</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant={"outline"} size={"icon-sm"}>
                      <CheckIcon />
                    </Button>
                    <Button variant={"outline"} size={"icon-sm"}>
                      <XIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant={"outline"} size={"icon-sm"}>
                      <CheckIcon />
                    </Button>
                    <Button variant={"outline"} size={"icon-sm"}>
                      <XIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant={"outline"} size={"icon-sm"}>
                      <CheckIcon />
                    </Button>
                    <Button variant={"outline"} size={"icon-sm"}>
                      <XIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className="mt-4 text-secondary" variant={"link"}>
              <PlusIcon />
              Add Custom Rule
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Creator Name</TableHead>
                <TableHead>Storefront</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Split</TableHead>
                <TableHead>Platform Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {payment.creatorName}
                  </TableCell>
                  <TableCell>{payment.storefront}</TableCell>
                  <TableCell>{payment.balance}</TableCell>
                  <TableCell>{payment.requested}</TableCell>
                  <TableCell>{payment.split}</TableCell>
                  <TableCell>{payment.platformFee}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <CheckIcon className="h-4 w-4 text-gray-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <XIcon className="h-4 w-4 text-gray-700" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardContent className="w-full grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <Label>Threshold</Label>
            <Input placeholder="$30" />
          </div>
          <div className="space-y-4">
            <Label>Payout Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Freuency" />
              </SelectTrigger>
            </Select>
          </div>
          <div className="">
            <Label>Payout Frequency</Label>
            <div className="w-full pt-4 flex">
              <div className="size-12 bg-zinc-100 flex justify-center items-center rounded-lg text-secondary">
                <CreditCardIcon />
              </div>
              <div className="pl-4">
                <h6 className="font-bold">Stripe</h6>
                <p className="text-xs">1-2 business days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
