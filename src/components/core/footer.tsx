import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const footerLinks = {
  topCategories: [
    { name: "Hotels", href: "/explore" },
    { name: "Activities", href: "/explore" },
    { name: "Restaurants", href: "/explore" },
    { name: "Vacation Rentals", href: "/explore" },
  ],
  support: [
    { name: "Terms & Condition", href: "/tnc" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTiktok, label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="px-6 py-12 bg-primary text-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-2">
            <Image
              alt="logo"
              draggable={false}
              height={124}
              width={124}
              src="/logo.png"
              className="size-12"
            />
            <p className="text-lg font-bold">Pocketoire</p>
          </div>
          <p className="text-sm mt-3">pocketoiretravel@gmail.com</p>
          <div className="mt-4 text-sm text-start  text-background/70">
            <span className="text-background font-semibold">
              Affiliate Disclosure:
            </span>{" "}
            Some of the links on this website are affiliate links. <br /> This
            means that Pocketoire may earn a commission if you click through and
            make a purchase, at no additional cost to you. We only feature
            travel products, hotels, and experiences that our creators genuinely
            recommend.
          </div>
        </div>

        {/* Top Category */}
        <FooterSection
          title="TOP CATEGORY"
          items={footerLinks.topCategories}
          browseAll
        />

        {/* Support */}
        <FooterSection title="SUPPORT" items={footerLinks.support} />

        {/* Social */}
        <div>
          <h3 className="text-base font-semibold mb-4">CONNECT</h3>
          <p className="text-sm mb-4 leading-relaxed">
            Follow us on social media for updates and inspiration.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="size-10 rounded-full bg-background flex items-center justify-center hover:bg-background/90 transition-colors"
              >
                <Icon className="size-5 text-secondary!" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Note (optional) */}
      <div className="mt-12 border-t border-background/20 pt-6 text-center text-sm text-background/70">
        © {new Date().getFullYear()} Pocketoire. All rights reserved.
      </div>
    </footer>
  );
}

function FooterSection({
  title,
  items,
  browseAll = false,
}: {
  title: string;
  items: { name: string; href: string }[];
  browseAll?: boolean;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              className="text-sm hover:text-background/80 transition-colors block"
            >
              {name}
            </Link>
          </li>
        ))}

        {browseAll && (
          <li className="pt-2">
            <Link
              href="/explore"
              className="text-sm text-destructive font-bold inline-flex items-center gap-1 transition-colors"
            >
              Browse All Product
              <ArrowRight className="size-4" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
