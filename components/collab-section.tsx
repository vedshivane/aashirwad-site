import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function CollabSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-28 lg:px-10 bg-[var(--surface-ground)] border-y border-[var(--line-soft)]">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionHeading
            eyebrow="Partnership"
            title="Collaborate & Retail"
            body="We partner with retailers, dealers, and architects who prioritize quality standards over compromise."
          />
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-panel)] px-8 py-10 lg:px-10 lg:py-12">
              <h3 className="font-display text-2xl md:text-3xl text-[var(--ink-strong)] tracking-tight">Retailers & Dealers</h3>
              <p className="mt-4 text-[1.1rem] leading-relaxed text-[var(--ink-muted)]">
                Offer your customers premium, heavy-duty WPC products. We providing dedicated project support and high-performance supply chains.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-panel)] px-8 py-10 lg:px-10 lg:py-12">
              <h3 className="font-display text-2xl md:text-3xl text-[var(--ink-strong)] tracking-tight">Architects & Builders</h3>
              <p className="mt-4 text-[1.1rem] leading-relaxed text-[var(--ink-muted)]">
                Specify EcoAashirwad for precision green-building projects. Our CPWD-recognized solutions are engineered for demanding architectural environments.
              </p>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap justify-center">
            <Link href="/contact" className="button-primary px-12 py-5 text-base">
              Become a Partner
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
