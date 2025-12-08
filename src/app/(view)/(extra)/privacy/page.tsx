import Header from "@/components/core/header";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <Header
        title="Privacy Policy"
        desc="Privacy Policy · Last updated: September 07, 2025. Your privacy matters to us. Here’s how we handle your data to keep it safe and secure."
      />

      <main className="my-24 px-4">
        <Card className="lg:w-3/4 mx-auto shadow-md">
          <CardContent className="prose prose-neutral max-w-none py-10">
            <p className="font-semibold mb-6">Last Updated: 12/01/2025</p>

            <p className="mb-6">
              Pocketoire (“we,” “our,” or “us”) provides a platform that allows
              creators to curate travel recommendations and earn commissions
              through affiliate links. This Privacy Policy explains how we
              collect, use, and protect your information when you access
              pocketoire.com (“Site”) or use any of our services (“Services”).
            </p>

            {/* ================= SECTION 1 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-medium mt-6 mb-2">
              1.1 Information You Provide to Us
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Account Information:</strong> name, email address,
                username, password.
              </li>
              <li>
                <strong>Creator Profile Details:</strong> photos, travel
                preferences, bios, trip collections.
              </li>
              <li>
                <strong>Affiliate Earnings Information:</strong> payment details
                (e.g., PayPal email or bank info).
              </li>
              <li>
                <strong>Communication:</strong> inquiries, support requests, or
                feedback.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-2">
              1.2 Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>Usage Data:</strong> pages visited, clicks, time spent,
                referring URLs.
              </li>
              <li>
                <strong>Device Data:</strong> browser type, IP address,
                operating system, device identifiers.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> used to
                improve the platform and track performance.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-2">
              1.3 Information from Third Parties
            </h3>
            <p className="mb-2">
              Affiliate networks such as{" "}
              <strong>Skimlinks, Impact, Rakuten</strong>, or merchants may send
              us:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Click data</li>
              <li>Revenue/commission data</li>
              <li>Order information</li>
            </ul>
            <p className="mb-6">
              This information is tied to your account so you can track
              performance.
            </p>

            {/* ================= SECTION 2 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Operate and maintain the Pocketoire platform</li>
              <li>
                Track and attribute affiliate clicks, sales, and commissions
              </li>
              <li>Process payouts to creators</li>
              <li>Provide customer support</li>
              <li>Improve website performance and user experience</li>
              <li>Detect and prevent fraudulent or abusive activity</li>
              <li>Comply with legal and financial obligations</li>
            </ul>

            {/* ================= SECTION 3 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. How We Share Information
            </h2>
            <p className="mb-2">We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Affiliate Networks</strong> (e.g., Skimlinks, Impact)
                for link generation and performance tracking
              </li>
              <li>
                <strong>Payment Processors</strong> (e.g., Stripe) to fulfill
                payouts
              </li>
              <li>
                <strong>Service Providers</strong> assisting with hosting,
                analytics, email, and platform operations
              </li>
              <li>
                <strong>Legal Authorities</strong> if required by law
              </li>
            </ul>
            <p className="mb-6">
              We <strong>do not sell</strong> your personal information.
            </p>

            {/* ================= SECTION 4 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              4. Cookies & Tracking
            </h2>
            <p className="mb-2">We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Improve browsing experience</li>
              <li>Remember login preferences</li>
              <li>Track clicks and conversions for affiliate revenue</li>
              <li>Analyze website performance</li>
            </ul>
            <p className="mb-6">
              You can disable cookies in your browser settings, but certain
              features may not function.
            </p>

            {/* ================= SECTION 5 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Data Retention
            </h2>
            <p className="mb-2">
              We retain your information for as long as your account is active
              or as needed for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Accounting</li>
              <li>Reporting to affiliate networks</li>
              <li>Legal or regulatory compliance</li>
            </ul>

            {/* ================= SECTION 6 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              6. Data Security
            </h2>
            <p className="mb-6">
              We implement industry-standard security practices including
              encryption, access controls, and monitoring. However, no method of
              transmission over the Internet is 100% secure.
            </p>

            {/* ================= SECTION 7 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
            <p className="mb-2">
              Depending on your location, you may have rights to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Access your data</li>
              <li>Update or delete your data</li>
              <li>Opt out of marketing</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="mb-6">
              Contact us at <strong>[insert email]</strong> to submit a request.
            </p>

            {/* ================= SECTION 8 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              8. Children’s Privacy
            </h2>
            <p className="mb-6">
              Pocketoire is not intended for users under <strong>18</strong>. We
              do not knowingly collect information from minors.
            </p>

            {/* ================= SECTION 9 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="mb-6">
              We may update this Privacy Policy at any time. The “Last Updated”
              date reflects the latest version.
            </p>

            {/* ================= SECTION 10 ================= */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p className="mb-2">For questions or privacy requests, contact:</p>
            <p className="mb-6">
              <strong>Pocketoire</strong>
              <br />
              Email: pocketoiretravel@gmail.com
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
