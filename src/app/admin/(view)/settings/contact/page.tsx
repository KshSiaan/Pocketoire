import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
export default function Page() {
  const contactData = [
    {
      name: "John D.",
      email: "John@gmail.com",
      messagePreview: "5 Common Mistakes to Avoid When Filing an ...",
      dateSubmitted: "15/06/2025",
      status: "Read",
    },
  ];
  return (
    <main>
      <Card>
        <CardHeader>
          <div className="w-full justify-between items-center flex">
            <CardTitle className="text-2xl italic">Contact Messages</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>
                  <PlusIcon /> New Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="pb-2">
                  <DialogTitle>Message Details</DialogTitle>
                  <DialogDescription>Jun 15, 2025, 10:30 AM</DialogDescription>
                </DialogHeader>
                <div className="w-full space-y-4">
                  <Label>Name</Label>
                  <Input />
                  <Label>Email</Label>
                  <Input />
                  <Label>Message</Label>
                  <Textarea className="min-h-[200px]" />
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Mark as Read</p>
                    <Switch />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant={"secondary"}>
                    <Trash2Icon />
                    Delete
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
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-t">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactData.map((contact, index) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.messagePreview}</TableCell>
                  <TableCell>{contact.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100/90 font-normal">
                      {contact.status}
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
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2Icon className="h-4 w-4" />
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
