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
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editAlbumApi } from "@/lib/api/storefront";
import { useCookies } from "react-cookie";

export default function EditAlbum({
  album,
}: {
  album: {
    id: number;
    name: string;
    description: string;
    products_count: number;
    total_clicks: number;
    total_earnings: string | number | null;
  };
}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(album.name);
  const [description, setDescription] = React.useState(album.description);
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["edit_album", album.id],
    mutationFn: async () => {
      return await editAlbumApi(
        album.id,
        {
          name: title,
          description,
        },
        token,
      );
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
        <Button variant={"ghost"} size={"icon"}>
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Album</DialogTitle>
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
            {isPending ? "Updating..." : "Update Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
