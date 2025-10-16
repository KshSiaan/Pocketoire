import Header from "@/components/core/header";
import { Card, CardContent } from "@/components/ui/card";
export default function Page() {
  return (
    <>
      <Header
        title="Terms & Condition"
        desc="Last updated: September 07, 2025. Please read these terms carefully before using the Pocketoire platform."
      />
      <main className="my-[100px] px-4">
        <Card className="lg:w-3/4 mx-auto">
          <CardContent>
            Welcome to CoverageGrader. By accessing or using our website and
            services (the "Platform"), you agree to be bound by these Terms of
            Service ("Terms") and our Privacy Policy. If you do not agree to
            these Terms, you may not use the Platform. 1. Acceptance of Terms By
            creating an account, submitting a review, or otherwise using our
            Platform, you confirm that you have read, understood, and agree to
            these Terms. We may modify these Terms at any time, and such
            modifications will be effective upon posting. Your continued use of
            the Platform after any changes constitutes your acceptance of the
            new Terms. 2. User Responsibilities You agree to use the Platform
            responsibly and in compliance with our Community Guidelines. You are
            responsible for: Providing accurate, truthful, and first-hand
            information in your reviews. Maintaining the confidentiality of your
            account information. Refraining from posting spam, fraudulent
            content, profanity, or content that infringes on the rights of
            others. 3. Intellectual Property You retain ownership of the content
            you submit (your "User Content"), such as reviews. However, by
            submitting User Content to the Platform, you grant CoverageGrader a
            worldwide, non-exclusive, royalty-free, perpetual license to use,
            reproduce, modify, display, and distribute your User Content in
            connection with the Platform. 4. Review Moderation We reserve the
            right, but not the obligation, to moderate all User Content. We may
            remove, edit, or refuse to post any content that, in our sole
            judgment, violates these Terms or our Community Guidelines. Our
            moderation process is designed to maintain the integrity and
            trustworthiness of our community. 5. Limitation of Liability The
            information on CoverageGrader is provided for informational purposes
            only and is not insurance or financial advice. We are a neutral
            platform and are not responsible for the actions, policies, or
            quality of service of any insurance provider listed. Your reliance
            on any information on the Platform is at your own risk. 6.
            Third-Party Links & Sponsored Content Our Platform may contain links
            to third-party websites and feature sponsored content from our
            partners. We clearly label sponsored content. We are not responsible
            for the content, privacy policies, or practices of any third-party
            sites.
          </CardContent>
        </Card>
      </main>
    </>
  );
}
