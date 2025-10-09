import Image from "next/image";
import Link from "next/link";
import { Instagram, Music2, ArrowRight } from "lucide-react";

const footerLinks = {
  topCategories: [
    "Computer & Laptop",
    "SmartPhone",
    "Headphone",
    "Camera & Photo",
    "TV & Homes",
  ],
  support: ["Help Center", "FAQs", "Contact Us", "Privacy Policy"],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Music2, label: "TikTok", href: "#" },
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
                <Icon className="size-5 text-primary" />
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
  items: string[];
  browseAll?: boolean;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-sm hover:text-background/80 transition-colors block"
            >
              {item}
            </Link>
          </li>
        ))}

        {browseAll && (
          <li className="pt-2">
            <Link
              href="#"
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
