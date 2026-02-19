"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Dropzone,
  DropZoneArea,
  DropzoneTrigger,
  DropzoneMessage,
  useDropzone,
} from "@/components/ui/dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { base_api, base_url, cn, howl } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse } from "@/types/base";
import { useCookies } from "react-cookie";
import { useMeStore } from "@/lib/moon/user-store";
import { useRouter } from "next/navigation";
export default function Page() {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const [name, setName] = React.useState("");

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 5 * 1024 * 1024,
      maxFiles: 1,
    },
    shiftOnMaxFiles: true,
  });
  const { mutate, isPending: Loading } = useMutation({
    mutationKey: ["edit_profile"],
    mutationFn: async (): Promise<ApiResponse<unknown>> => {
      const form = new FormData();
      form.append("name", name);

      if (dropzone.fileStatuses[0]?.result) {
        form.append("profile_photo", dropzone.fileStatuses[0].file);
      }

      const response = await fetch(`${base_url}${base_api}/profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return response.json();
    },

    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      
    },
  });
  const avatarSrc = dropzone.fileStatuses[0]?.result;
  const isPending = dropzone.fileStatuses[0]?.status === "pending";

  return (
    <div className="my-24 container mx-auto">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dropzone {...dropzone}>
            <div className="flex justify-between">
              <DropzoneMessage />
            </div>
            <DropZoneArea className="w-fit mx-auto p-0">
              <DropzoneTrigger className="flex gap-8 bg-transparent hover:bg-blue-600/20 text-sm">
                <Avatar className={cn(isPending && "animate-pulse")}>
                  <AvatarImage className="object-cover" src={avatarSrc} />
                  <AvatarFallback>JG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 font-semibold">
                  <p>Upload a new avatar</p>
                  <p className="text-xs text-muted-foreground">
                    Please select an image smaller than 5mb.
                  </p>
                </div>
              </DropzoneTrigger>
            </DropZoneArea>
          </Dropzone>
          <Label>Name:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant={"outline"}
            disabled={Loading}
            onClick={() => navig.back()}
          >
            Go Back
          </Button>
          <Button disabled={Loading} onClick={() => mutate()}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
