"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";

import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [content, setContent] = React.useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tnc"],
    queryFn: async (): Promise<
      ApiResponse<{
        id: number;
        content: string;
      }>
    > => {
      return howl(`/terms`);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update_tnc"],
    mutationFn: (): Promise<ApiResponse<any>> => {
      return howl(`/admin/terms`, {
        method: "POST",
        body: {
          content,
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
    },
  });
  useEffect(() => {
    if (data?.data?.content) {
      setContent(data?.data?.content ?? "");
    }
  }, [data]);
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Terms & conditions</CardTitle>
          <CardDescription>Admin can edit disclaimer</CardDescription>
        </CardHeader>
        <CardContent>
          <Editor
            value={content}
            onTextChange={(e) => setContent(e.htmlValue ?? "")}
            style={{ height: "320px" }}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => mutate()}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
