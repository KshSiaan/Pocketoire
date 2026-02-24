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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Page() {
  const navig = useRouter();
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { mutate } = useMutation({
    mutationKey: ["update_faq"],
    mutationFn: (): Promise<ApiResponse<any>> => {
      return howl(`/admin/faq`, {
        method: "POST",
        body: {
          question: title,
          answer: content,
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["faq"] });
      navig.push("/admin/settings/faq");
    },
  });
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>Admin can add FAQ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            className="border-muted-foreground/50 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
            value={content}
            onTextChange={(e) => setContent(e.textValue ?? "")}
            style={{ height: "320px" }}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => mutate()}
          >
            Add
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
