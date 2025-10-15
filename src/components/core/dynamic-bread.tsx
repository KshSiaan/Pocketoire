"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DynamicBread() {
  const path = usePathname();
  if (path === "/") {
    return null;
  }
  const segments = path.split("/").filter(Boolean); // remove empty parts

  return (
    <div className="w-full bg-zinc-300 py-2 px-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, i) => {
            // biome-ignore lint/style/useTemplate: idk
            const href = "/" + segments.slice(0, i + 1).join("/");
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <div key={i} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {i === segments.length - 1 ? (
                    <span className="text-zinc-700 font-medium">{label}</span>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
