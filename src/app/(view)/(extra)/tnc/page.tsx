import Header from "@/components/core/header";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <Header
        title="Terms & Condition"
        desc="Last updated: September 07, 2025. Please read these terms carefully before using the Pocketoire platform."
      />

      <main className="my-24 px-4">
        <Card className="lg:w-3/4 mx-auto shadow-md">
          <CardContent className="prose prose-neutral max-w-none py-10">
            <p className="font-semibold">Last Updated: 12/01/2025</p>

            <p>
              These Terms of Use (“Terms”) govern your access and use of
              pocketoire.com (“Site”) and Pocketoire’s creator platform
              (“Services”). By accessing or using the Site, you agree to these
              Terms.
            </p>

            {/* ================= SECTION 1 ================= */}
            <h2 className="mt-10 font-bold text-xl">1. Eligibility</h2>
            <p>To use Pocketoire, you must:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Be at least 18 years old</li>
              <li>Create an account with accurate information</li>
              <li>Comply with all applicable laws</li>
            </ul>

            {/* ================= SECTION 2 ================= */}
            <h2 className="mt-10 font-bold text-xl">2. Your Account</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activity under your account</li>
              <li>Updating your profile information when necessary</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these Terms.
            </p>

            {/* ================= SECTION 3 ================= */}
            <h2 className="mt-10 font-bold text-xl">
              3. Creator Responsibilities
            </h2>
            <p>Creators agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Only upload content they own or have rights to</li>
              <li>Ensure recommendations are honest and not misleading</li>
              <li>
                Follow all affiliate network policies (including Skimlinks,
                Impact, etc.)
              </li>
              <li>
                Not engage in fraudulent click activity or artificial traffic
                generation
              </li>
            </ul>
            <p>Creators are solely responsible for the content they publish.</p>

            {/* ================= SECTION 4 ================= */}
            <h2 className="mt-10 font-bold text-xl">
              4. Affiliate Links & Earnings
            </h2>
            <p>
              Pocketoire integrates with affiliate providers such as{" "}
              <strong>Skimlinks</strong>, <strong>Impact</strong>, and others.
            </p>
            <p>By using our platform, you acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Earnings are based on affiliate network reporting</li>
              <li>Tracking failures or merchant changes may impact earnings</li>
              <li>Pocketoire is not liable for rejected commissions</li>
              <li>
                Payouts are made only after affiliate networks pay Pocketoire
              </li>
              <li>
                Pocketoire may deduct platform service fees and/or payment
                processing fees
              </li>
            </ul>
            <p>
              You must provide valid payout information to receive earnings.
            </p>

            {/* ================= SECTION 5 ================= */}
            <h2 className="mt-10 font-bold text-xl">5. Payouts</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Payout thresholds, timing, and fees are disclosed on our{" "}
                <strong>Payout Policy</strong> page
              </li>
              <li>
                Pocketoire reserves the right to withhold payouts in cases of
                suspected fraud or policy violations
              </li>
            </ul>

            {/* ================= SECTION 6 ================= */}
            <h2 className="mt-10 font-bold text-xl">6. Prohibited Conduct</h2>
            <p>
              Users may <strong>not</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use Pocketoire for unlawful purposes</li>
              <li>Impersonate another person or entity</li>
              <li>Engage in scraping, hacking, or security breaches</li>
              <li>Manipulate click tracking or affiliate performance</li>
              <li>Post inappropriate, offensive, or harmful content</li>
            </ul>
            <p>Violation may result in account suspension or termination.</p>

            {/* ================= SECTION 7 ================= */}
            <h2 className="mt-10 font-bold text-xl">
              7. Intellectual Property
            </h2>
            <p>Pocketoire owns:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Site</li>
              <li>Branding</li>
              <li>Designs</li>
              <li>Features</li>
              <li>Digital content created by Pocketoire</li>
            </ul>
            <p>
              Creators retain rights to content they upload but grant Pocketoire
              a <strong>license</strong> to display and use it on the platform.
            </p>

            {/* ================= SECTION 8 ================= */}
            <h2 className="mt-10 font-bold text-xl">8. Third-Party Services</h2>
            <p>
              Pocketoire uses third-party affiliate networks, APIs, analytics
              tools, and payment processors.
            </p>
            <p>We are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Their service outages</li>
              <li>Changes in merchant commissions</li>
              <li>Tracking discrepancies</li>
              <li>Merchant program closures</li>
            </ul>
            <p>
              Your use of those third parties is governed by their own terms.
            </p>

            {/* ================= SECTION 9 ================= */}
            <h2 className="mt-10 font-bold text-xl">
              9. Disclaimer of Warranties
            </h2>
            <p>Pocketoire is provided “AS IS” without warranties.</p>
            <p>We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Earnings</li>
              <li>Tracking accuracy</li>
              <li>Affiliate commissions</li>
              <li>Website uptime</li>
            </ul>

            {/* ================= SECTION 10 ================= */}
            <h2 className="mt-10 font-bold text-xl">
              10. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Pocketoire is not
              responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Lost earnings</li>
              <li>Tracking errors</li>
              <li>Data loss</li>
              <li>Website interruptions</li>
              <li>Harm caused by misuse of the platform</li>
            </ul>

            {/* ================= SECTION 11 ================= */}
            <h2 className="mt-10 font-bold text-xl">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Pocketoire from any
              claims arising from your:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Content</li>
              <li>Misuse of the platform</li>
              <li>Violations of these Terms</li>
              <li>Violations of affiliate network policies</li>
            </ul>

            {/* ================= SECTION 12 ================= */}
            <h2 className="mt-10 font-bold text-xl">
              12. Changes to These Terms
            </h2>
            <p>
              We may update these Terms at any time. Continued use of the Site
              constitutes acceptance of the updated terms.
            </p>

            {/* ================= SECTION 13 ================= */}
            <h2 className="mt-10 font-bold text-xl">13. Contact Us</h2>
            <p>For questions regarding these Terms:</p>
            <p>
              <strong>Pocketoire</strong>
            </p>
            <p>Email: pocketoiretravel@gmail.com</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
