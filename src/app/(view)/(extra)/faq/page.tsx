import Header from "@/components/core/header";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
export default async function Page() {
  const data: ApiResponse<
    {
      id: number;
      question: string;
      answer: string;
    }[]
  > = await howl(`/faq`);
  return (
    <>
      <Header
        title="Frequently Asked Questions"
        desc="Find answers to common questions about Pocketoire and how our community works."
      />
      <main className="my-[100px] p-4">
        <Card className="lg:w-3/4 mx-auto">
          <CardContent>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {data?.data?.map((item) => (
                <AccordionItem value={"item-" + item.id} key={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        <Card className="lg:w-3/4 mx-auto mt-12">
          <CardContent className="space-y-6 text-center">
            <h3 className="text-4xl text-center">
              Can't find what you're looking for?
            </h3>
            <p>
              Our support team is happy to help with any other questions you may
              have.
            </p>
            <Button variant={"secondary"} asChild>
              <Link href={"/contact"}>Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
