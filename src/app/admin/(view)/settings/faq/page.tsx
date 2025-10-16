import { Button } from "@/components/ui/button";
import { Edit, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="w-full flex justify-between items-center">
        <h4 className="text-2xl">FAQ Management</h4>
        <Button variant={"secondary"}>
          <PlusIcon />
          Add New FAQ
        </Button>
      </div>
      <div className="mt-12 space-y-3">
        <div className="flex justify-between w-full items-center p-6 border bg-white shadow">
          <div className="">
            <h3 className="text-lg font-bold">System Maintenance Notice</h3>
            <p className="text-sm">Sent to all users - 2 hours ago</p>
          </div>
          <div className="space-x-2">
            <Button variant={"outline"} size={"icon-sm"} asChild>
              <Link href={"faq/id"}>
                {" "}
                <Edit />
              </Link>
            </Button>
            <Button
              variant={"outline"}
              className="text-destructive"
              size={"icon-sm"}
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
