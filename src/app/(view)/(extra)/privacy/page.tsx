import Header from "@/components/core/header";
import { Card, CardContent } from "@/components/ui/card";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import DOMPurify from "isomorphic-dompurify";

export default async function Page() {
  const data: ApiResponse<{
    id: number;
    content: string;
  }> = await howl(`/privacy-policy`, {
    headers: {
      cache: "no-store",
    },
  });

  const sanitizedContent = DOMPurify.sanitize(data?.data?.content ?? "");

  return (
    <>
      <Header
        title="Privacy Policy"
        // desc="Privacy Policy · Last updated: September 07, 2025. Your privacy matters to us. Here’s how we handle your data to keep it safe and secure."
      />

      <main className="my-24 px-4">
        <Card className="lg:w-3/4 mx-auto shadow-md">
          <CardContent className="prose prose-neutral max-w-none py-10">
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is sanitized with DOMPurify before rendering.
              dangerouslySetInnerHTML={{
                __html: sanitizedContent,
              }}
            />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
