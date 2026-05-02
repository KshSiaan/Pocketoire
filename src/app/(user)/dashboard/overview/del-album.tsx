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
import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAlbumApi } from "@/lib/api/storefront";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

export default function DelAlbum({
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
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_album", album.id],
    mutationFn: async () => {
      return await deleteAlbumApi(album.id, token);
    },
    onError: (err) => {
      const isAuthError =
        err.message?.includes("Authentication token format") ||
        err.message?.includes("API request failed");
      if (isAuthError) {
        toast.error("Session expired. Logging you out...");
      } else {
        toast.error(err.message ?? "Failed to delete album");
      }
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Album deleted!");
      qcl.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="text-destructive">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the album "{album.name}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive!" asChild>
            <Button
              variant={"destructive"}
              onClick={() => mutate()}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
