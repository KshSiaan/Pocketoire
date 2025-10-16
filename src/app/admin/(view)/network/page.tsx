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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
export default function Page() {
  const networkData = [
    {
      networkName: "Amamzon",
      status: "Active",
      apiKey: "626763656",
      lastSync: "24 sept, 2025",
    },
  ];
  return (
    <main>
      <Card>
        <CardHeader>
          <div className="w-full justify-between items-center flex">
            <CardTitle className="text-2xl italic">
              Affiliate Network Credentials
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>
                  <PlusIcon /> Add New Network
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="pb-2 border-b">
                  <DialogTitle>Add New Network </DialogTitle>
                </DialogHeader>
                <div className="w-full space-y-4">
                  <Label>Network Name</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Network" />
                    </SelectTrigger>
                  </Select>
                  <Label>API Key/ CLient ID</Label>
                  <Input />
                  <Label>Affiliate ID</Label>
                  <Input />
                  <Label>Secret Key</Label>
                  <Input />
                  <Label>Status</Label>
                  <div className="flex items-center gap-2">
                    <Switch /> <p>Active</p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button variant={"secondary"}>Save Changes</Button>
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
                <TableHead className="italic">Network Name</TableHead>
                <TableHead className="italic">Status</TableHead>
                <TableHead className="italic">Api Key/Credentials</TableHead>
                <TableHead className="italic">Last Sync</TableHead>
                <TableHead className="italic">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networkData.map((network, index) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="font-medium">
                    {network.networkName}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100/90 font-normal">
                      {network.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{network.apiKey}</TableCell>
                  <TableCell>{network.lastSync}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <RefreshCwIcon className="h-4 w-4 text-gray-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <PencilIcon className="h-4 w-4 text-gray-700" />
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
