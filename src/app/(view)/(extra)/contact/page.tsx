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
        desc="We’re here to help. Send us your question or feedback, and we’ll get back to you as soon as possible."
      />

      <main className="px-8 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-6 gap-10 items-start">
        {/* Contact Form */}
        <Card className="lg:col-span-4 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold italic text-primary">
              Send a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="you@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  className="min-h-[200px]"
                  placeholder="Write your message here..."
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button size="lg" variant="secondary" className="px-8">
              Submit Message
            </Button>
          </CardFooter>
        </Card>

        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MailIcon className="text-secondary" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base leading-relaxed">
              <p>For direct inquiries, reach our support team at:</p>
              <p className="text-secondary font-semibold">
                support@coveragegrader.com
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPinIcon className="text-secondary" />
                Our Office
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-relaxed">
              <p>
                123 Community Lane <br />
                San Francisco, CA 94105
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
