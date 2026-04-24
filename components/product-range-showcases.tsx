import Image from "next/image";

import { Reveal } from "@/components/reveal";
import type { RangeShowcase } from "@/lib/types";

interface ProductRangeShowcasesProps {
  items: RangeShowcase[];
}

export function ProductRangeShowcases({ items }: ProductRangeShowcasesProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="px-5 py-16 md:px-8 md:py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:gap-10">
        {items.map((item, index) => {
          const reverse = index % 2 === 1;

          return (
            <div
              key={item.title}
              className={`grid gap-6 lg:grid-cols-[1.02fr_0.98fr] ${reverse ? "lg:grid-cols-[0.98fr_1.02fr]" : ""}`}
            >
              <Reveal className={`surface-panel overflow-hidden ${reverse ? "lg:order-2" : ""}`}>
                <div className="relative flex h-full flex-col gap-6">
                  {item.badge || item.logoSrc ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {item.badge ? (
                        <span className="inline-flex w-fit items-center rounded-full border border-[var(--accent-red)] bg-orange-50/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3d2b]">
                          {item.badge}
                        </span>
                      ) : null}

                      {item.logoSrc ? (
                        <div className="relative h-12 w-[9.5rem] shrink-0">
                          <Image
                            src={item.logoSrc}
                            alt={item.logoAlt ?? `${item.eyebrow} logo`}
                            fill
                            sizes="152px"
                            className="object-contain object-left"
                            unoptimized
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div>
                    <p className="eyebrow">{item.eyebrow}</p>
                    <h3 className="mt-3 font-display text-[2.2rem] leading-[0.98] tracking-[-0.05em] text-[var(--ink-strong)] md:text-[3rem]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="max-w-3xl text-[1.12rem] font-medium leading-[1.9] text-[var(--ink-primary)]">
                    {item.body}
                  </p>

                  <div className="grid gap-3">
                    {item.facts.map((fact) => (
                      <div key={fact} className="flex gap-4 border-t border-[color:var(--line-soft)] pt-4">
                        <span className="mt-[0.68rem] h-[8px] w-[8px] shrink-0 rounded-full bg-[var(--accent-red)]" />
                        <p className="text-[1.05rem] font-medium leading-[1.8] text-[var(--ink-primary)]">
                          {fact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className={`surface-panel range-showcase-art-panel ${reverse ? "lg:order-1" : ""}`}>
                  <div className="range-showcase-art-frame">
                  <div className="range-showcase-art-glow" />
                  <div className="range-showcase-art-card">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      unoptimized
                      className={item.imageFit === "cover" ? "object-cover p-0" : "object-contain p-4"}
                    />
                  </div>
                  </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
