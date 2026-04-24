"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLockup } from "@/components/brand-lockup";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-5">
      <div className="mx-auto max-w-[1400px]">
        <div className="site-header-panel">
          <Link href="/" className="site-header-brand group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-red)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--surface-ground)]">
            <BrandLockup variant="compact" />
          </Link>

          <nav aria-label="Primary" className="site-header-nav text-sm font-medium text-[var(--ink-muted)]">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link site-nav-link ${isActive ? "site-nav-link-active" : ""}`}
                >
                {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
