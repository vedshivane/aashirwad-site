import Link from "next/link";

import { contactEmail } from "@/lib/content";
import {
  businessAddress,
  businessCategory,
  businessMapEmbedUrl,
  businessMapUrl,
  businessPhone,
} from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

interface LocationSectionProps {
  eyebrow: string;
  title: string;
  body: string;
}

export function LocationSection({
  eyebrow,
  title,
  body,
}: LocationSectionProps) {
  return (
    <section className="px-5 py-16 md:px-8 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-4xl">
          <SectionHeading eyebrow={eyebrow} title={title} body={body} />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="surface-panel overflow-hidden p-0">
            <div className="relative min-h-[360px] overflow-hidden rounded-[1.7rem]">
              <iframe
                title="EcoAashirwad store location"
                src={businessMapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="surface-panel">
            <div className="flex h-full flex-col gap-6">
              <div className="inline-flex w-fit items-center rounded-full border border-[var(--line-strong)] bg-orange-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3d2b]">
                Interactive Store Map
              </div>

              <div>
                <p className="eyebrow">{businessCategory}</p>
                <h3 className="mt-3 font-display text-[2.15rem] leading-[0.96] tracking-[-0.05em] text-[var(--ink-strong)]">
                  Hyderabad location
                </h3>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-[var(--line-soft)] bg-white/70 px-5 py-4">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
                    Address
                  </p>
                  <p className="mt-2 text-[1.02rem] font-medium leading-[1.8] text-[var(--ink-primary)]">
                    {businessAddress}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--line-soft)] bg-white/70 px-5 py-4">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
                    Contact
                  </p>
                  <div className="mt-2 grid gap-2">
                    <a
                      href={`tel:${businessPhone.replace(/\s+/g, "")}`}
                      className="text-[1.02rem] font-medium text-[var(--ink-primary)] underline-offset-4 hover:underline"
                    >
                      {businessPhone}
                    </a>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-[1.02rem] font-medium text-[var(--ink-primary)] underline-offset-4 hover:underline"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-4">
                <a
                  href={businessMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary"
                >
                  Open in Google Maps
                </a>
                <Link href="/contact" className="button-secondary">
                  Contact us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
