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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { CheckIcon, EyeIcon, SearchIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl italic">Creator Management</CardTitle>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search Providers...." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Storefront</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex justify-start items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage src={"https://avatar.iran.liara.run/public"} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <p className="font-bold">Sarah Johnson</p>
                    <p className="text-xs!">Sarah@gmail.com</p>
                  </div>
                </TableCell>
                <TableCell>Alex tech hub</TableCell>
                <TableCell>
                  <Badge>Pending</Badge>
                </TableCell>
                <TableCell>24 sept, 2025</TableCell>
                <TableCell>24.2k</TableCell>
                <TableCell>$1500</TableCell>
                <TableCell className="space-x-2">
                  <Button size={"icon-sm"} variant={"outline"} asChild>
                    <Link href={"creator/id"}>
                      <EyeIcon />
                    </Link>
                  </Button>
                  <Button size={"icon-sm"} variant={"outline"}>
                    <CheckIcon />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size={"icon-sm"} variant={"outline"}>
                        <Trash2Icon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are going about to delete the creator "Sarah
                          Johnson". This action can not be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive!">
                          Delete Creator
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
