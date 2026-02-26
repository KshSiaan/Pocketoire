"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { ApiResponse } from "@/types/base";
export default function CreateAlbum() {
  const [{ token }] = useCookies(["token"]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const qcl = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_album"],
    mutationFn: (): Promise<ApiResponse<null>> => {
      return howl(`/storefront/create-album`, {
        token,
        method: "POST",
        body: {
          name: title,
          description,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      setTitle("");
      setDescription("");
      qcl.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setOpen(false);
    },
  });
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} disabled={isPending}>
          <PlusIcon /> Create New Album
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="space-y-2">
            <Label>Album Name</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            onClick={() => {
              if (!title) {
                toast.error("Album name is required");
                return;
              }
              mutate();
            }}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
