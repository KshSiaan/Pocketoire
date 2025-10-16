import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Terms & conditions</CardTitle>
          <CardDescription>Admin can edit disclaimer</CardDescription>
        </CardHeader>
        <CardContent>
          <Editor value="Always bet on Prime!" style={{ height: "320px" }} />
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant={"secondary"}>
            Update
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
