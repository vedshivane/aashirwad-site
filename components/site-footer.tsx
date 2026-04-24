import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { contactEmail, navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line-soft)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-8 lg:px-10">
        <div className="space-y-5">
          <BrandLockup variant="compact" />
          <p className="max-w-2xl text-base leading-7 text-[var(--ink-muted)]">
            Premium WPC doors, frames, and boards built for strength, density, and resin.
          </p>
          <a href={`mailto:${contactEmail}`} className="text-link">
            {contactEmail}
          </a>
        </div>

        <div className="grid gap-3">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--ink-subtle)]">
            Explore
          </p>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
