import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { ProductRangeIntro } from "@/lib/types";

interface ProductRangeIntroSectionProps {
  rangeIntro: ProductRangeIntro;
}

export function ProductRangeIntroSection({
  rangeIntro,
}: ProductRangeIntroSectionProps) {
  return (
    <section className="px-5 py-16 md:px-8 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-4xl">
          <SectionHeading
            eyebrow={rangeIntro.eyebrow}
            title={rangeIntro.title}
            body={rangeIntro.body}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal className="surface-panel relative overflow-hidden p-7 md:p-9">
            <div className="absolute right-[-3rem] top-[-3rem] h-36 w-36 rounded-full bg-[color:color-mix(in_oklab,var(--accent-red)_10%,white)] blur-3xl" />
              <div className="relative flex h-full flex-col gap-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                  {rangeIntro.featured.label ? (
                    <p className="eyebrow">{rangeIntro.featured.label}</p>
                  ) : null}
                  <h3 className="mt-3 font-display text-[2.35rem] leading-none tracking-[-0.05em] text-[var(--ink-strong)] md:text-[2.85rem]">
                    {rangeIntro.featured.name}
                  </h3>
                </div>

                {rangeIntro.featured.logoSrc ? (
                  <div className="product-range-logo product-range-logo-featured">
                    <Image
                      src={rangeIntro.featured.logoSrc}
                      alt={rangeIntro.featured.logoAlt ?? `${rangeIntro.featured.name} logo`}
                      width={440}
                      height={140}
                      sizes="220px"
                      className="h-auto w-full object-contain"
                      unoptimized
                    />
                  </div>
                ) : null}
              </div>

              <p className="max-w-2xl text-[1.12rem] font-medium leading-[1.9] text-[var(--ink-primary)]">
                {rangeIntro.featured.description}
              </p>

              <div className="inline-flex w-fit items-center rounded-full border border-[var(--line-strong)] bg-white/72 px-4 py-2 text-[0.82rem] font-bold uppercase tracking-[0.18em] text-[var(--accent-red-deep)] shadow-[0_18px_34px_-30px_rgba(59,34,20,0.5)]">
                {rangeIntro.availabilityNote}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {rangeIntro.supporting.map((item, index) => (
              <Reveal
                key={item.name}
                delay={index * 100}
                className="surface-panel product-range-support-panel"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    {item.label ? (
                      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                        {item.label}
                      </p>
                    ) : null}
                    <h3 className="font-display text-[1.8rem] leading-none tracking-[-0.05em] text-[var(--ink-strong)]">
                      {item.name}
                    </h3>
                    <p className="text-[1.04rem] font-medium leading-[1.8] text-[var(--ink-primary)]">
                      {item.description}
                    </p>
                  </div>

                  {item.logoSrc ? (
                    <div className="product-range-logo product-range-logo-support">
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt ?? `${item.name} logo`}
                        width={400}
                        height={128}
                        sizes="200px"
                        className="h-auto w-full object-contain"
                        unoptimized
                      />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
