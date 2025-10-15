import Header from "@/components/core/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon } from "lucide-react";
export default function Page() {
  return (
    <>
      <Header
        title="Contact Us"
        desc="We’re here to help. Send us your question or feedback and we’ll get back to you."
      />
      <main className="my-[100px] p-12 grid grid-cols-6 gap-6 items-start">
        <Card className="col-span-4">
          <CardContent>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input />
              <Label>Email Address</Label>
              <Input />
              <Label>Message</Label>
              <Textarea className="min-h-[200px]" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end">
            <Button variant={"secondary"}>Submit Message</Button>
          </CardFooter>
        </Card>
        <div className="col-span-2 space-y-6">
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MailIcon className="text-secondary" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>For direct inquiries, you can reach our support team at:</p>
              <p className="text-secondary font-semibold font-sans">
                support@coveragegrader.com
              </p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="text-secondary" />
                Our Office
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                123 Community Lane, <br />
                San Francisco, CA 94105
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
