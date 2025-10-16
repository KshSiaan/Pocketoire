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
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
export default function Page() {
  return (
    <main>
      <Card>
        <CardHeader>
          <div className="w-full justify-between items-center flex">
            <CardTitle className="text-2xl italic">
              Affiliate Feed Management
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>
                  <PlusIcon /> Add New Feed
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="pb-2 border-b">
                  <DialogTitle>Add New Feed </DialogTitle>
                </DialogHeader>
                <div className="w-full space-y-4">
                  <Label>Platform Name</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Platform" />
                    </SelectTrigger>
                  </Select>
                  <Label>Feed Name</Label>
                  <Input />
                  <Label>Feed URL or API Connection Details</Label>
                  <Input />
                  <Label>Credentials</Label>
                  <Input />
                  <Label>Sync Frequency</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Sync Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button variant={"secondary"}>Save</Button>
                  <Button className="bg-sky-400 hover:bg-sky-300/90">
                    Sync now
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
            <InputGroup>
              <InputGroupInput placeholder="Search users...." />
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
                <TableHead>Retailer</TableHead>
                <TableHead>Feed Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Next Sync</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Expedia</TableCell>
                <TableCell>Expedia feed</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>24 sept, 2025</TableCell>
                <TableCell>24 sept, 2025</TableCell>
                <TableCell className="space-x-2">
                  <Button size={"icon-sm"} variant={"outline"}>
                    <RefreshCwIcon className="h-4 w-4" />
                  </Button>
                  <Button size={"icon-sm"} variant={"outline"}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size={"icon-sm"}
                    variant={"outline"}
                    className="hover:bg-red-50 hover:border-red-500"
                  >
                    <Trash2Icon className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
