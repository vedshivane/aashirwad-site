import Link from "next/link";
import Image from "next/image";

import { LuxuryFloat } from "@/components/luxury-float";
import { ProductIllustration } from "@/components/product-illustration";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DoorVisualizer } from "@/components/door-visualizer";
import { FrameVisualizer } from "@/components/frame-visualizer";
import { ColorDisclaimer } from "@/components/color-disclaimer";
import { ProductRangeIntroSection } from "@/components/product-range-intro";
import { ProductRangeShowcases } from "@/components/product-range-showcases";
import { AnimatedApplicationsGrid } from "@/components/animated-applications-grid";
import type { ProductFamily } from "@/lib/types";

interface ProductPageProps {
  family: ProductFamily;
}

const stageLabels = {
  doors: "Straight door form with dense holding strength.",
  frames: "Stable frame sections built for strong fitting.",
  boards: "Board stock for fitted interiors and panel work.",
} as const;

const detailTitles = {
  doors: "Door details",
  frames: "Frame details",
  boards: "Board details",
} as const;

const applicationsTitles = {
  doors: "Where these doors are used.",
  frames: "Where these frames are used.",
  boards: "Where these boards are used.",
} as const;

function renderSpecValue(value: string) {
  const segments = value
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const looksStructured =
    segments.length > 1 && segments.every((segment) => segment.includes(":"));

  if (!looksStructured) {
    return <span>{value}</span>;
  }

  return (
    <div className="grid gap-2.5">
      {segments.map((segment) => {
        const [label, ...rest] = segment.split(":");
        const detail = rest.join(":").trim();

        return (
          <div
            key={segment}
            className="rounded-xl border border-[var(--line-soft)] bg-white/72 px-4 py-3"
          >
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-red-deep)]">
              {label.trim()}
            </span>
            <span className="mt-1 block text-[1rem] leading-7 text-[var(--ink-strong)]">
              {detail}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ProductPage({ family }: ProductPageProps) {
  return (
    <>
      <section className={`product-hero-section product-hero-section-${family.slug} px-5 pb-14 pt-8 md:px-8 md:pb-18 md:pt-10 lg:px-10`}>
        <div className="mx-auto max-w-[1440px]">
          <div className="product-hero-shell">
            <Reveal className="product-hero-copy">
              <p className="eyebrow">{family.name}</p>
              <h1 className="display-title product-page-title text-[var(--ink-strong)]">{family.strap}</h1>
              <p className="hero-copy hero-copy-wide">{family.summary}</p>

              <ul className="product-hero-list">
                {family.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-[0.84rem] h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--accent-red)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="button-primary">
                  {family.cta.primaryLabel}
                </Link>
                <Link href={`mailto:sbic1661@gmail.com`} className="button-secondary">
                  Email us
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140} className={`product-hero-stage product-stage-${family.slug}`}>
              <div className="hero-light-beam hero-light-beam-left" />
              <div className="hero-light-beam hero-light-beam-right" />
              <div className="hero-illustration-ring" />
              <div className="product-stage-grid" />
              <div className="product-stage-tag">{stageLabels[family.slug]}</div>
              <LuxuryFloat delay={0.2} distance={8} duration={8} className="product-hero-art">
                <ProductIllustration slug={family.slug} className="relative z-[2] mx-auto h-auto w-full max-w-[31rem]" />
              </LuxuryFloat>
              <div className="illustration-caption product-hero-caption">
                <p>{family.media.caption}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="product-ledger">
            <div className="product-ledger-item">
              <span>Core</span>
              <strong>{family.materialPromise}</strong>
            </div>
            <div className="product-ledger-item">
              <span>Best used in</span>
              <strong>{family.applications[0]?.name}</strong>
            </div>
            <div className="product-ledger-item">
              <span>Contact</span>
              <strong>Share size, quantity, and city</strong>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highest Quality Note requested by Client */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 mt-2 flex justify-end">
         <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-red)] bg-orange-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8b3d2b]">
            ★ Highest Quality WPC by EcoAashirwad
         </span>
      </div>

      {family.slug === "doors" && (
        <section className="px-5 py-8 md:px-8 lg:px-10 max-w-[1400px] mx-auto mt-2">
          <DoorVisualizer />
        </section>
      )}

      {family.slug === "frames" && (
        <section className="px-5 py-8 md:px-8 lg:px-10 max-w-[1400px] mx-auto mt-2">
          <FrameVisualizer />
        </section>
      )}

      <ProductRangeIntroSection rangeIntro={family.rangeIntro} />
      {family.rangeShowcases ? <ProductRangeShowcases items={family.rangeShowcases} /> : null}

      <section className="page-band px-5 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="max-w-4xl">
            <SectionHeading
              eyebrow={detailTitles[family.slug]}
              title={family.materialPromise}
              body="Exact sizes, models, sections, and thicknesses are shared against the final requirement. Not all colours are available in all thicknesses."
            />
          </Reveal>

          <div className={`mt-12 grid gap-6 ${family.specs.length === 1 ? "grid-cols-1" : "lg:grid-cols-2"}`}>
            {family.specs.map((group, index) => (
              <Reveal key={group.title} delay={index * 100} className="spec-panel product-spec-panel">
                <div className="space-y-4">
                  <h2 className="font-display text-[2.1rem] tracking-[-0.05em] text-[var(--ink-strong)]">
                    {group.title}
                  </h2>
                  {group.note ? (
                    <p className="body-copy font-medium text-[var(--ink-primary)]">{group.note}</p>
                  ) : null}
                </div>

                <dl className="mt-8 grid gap-5">
                  {group.items.map((item) => (
                    <div key={item.label} className="grid gap-2 border-t border-[color:var(--line-soft)] pt-5 md:grid-cols-[0.9fr_1.1fr]">
                      <dt className="text-[0.82rem] uppercase tracking-[0.18em] text-[var(--ink-subtle)]">
                        {item.label}
                      </dt>
                      <dd className="text-[1.05rem] font-medium leading-[1.85] text-[var(--ink-primary)]">
                        {renderSpecValue(item.value)}
                        {item.note ? (
                          <span className="block text-[0.97rem] font-medium text-[var(--ink-primary)]">
                            {item.note}
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>

                {group.imageSrc ? (
                  <div className="mt-8 overflow-hidden rounded-[1.4rem] border border-[var(--line-soft)] bg-white/70 shadow-[0_22px_48px_-34px_rgba(77,43,35,0.28)]">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={group.imageSrc}
                        alt={group.imageAlt ?? group.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        unoptimized
                        className={group.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
                      />
                    </div>
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {family.showFinishes ? (
        <section className="px-5 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <Reveal className="max-w-4xl">
              <SectionHeading
                eyebrow="Finishes"
                title="Three frame finish options."
                body="Each finish shows the frame brands where it is currently available."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <Reveal className="surface-panel product-finish-panel">
                <h2 className="text-[0.82rem] uppercase tracking-[0.24em] text-[var(--ink-subtle)]">Finish options</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {family.colors.map((color) => (
                    <article key={color.name} className="finish-monolith">
                      <div className="finish-monolith-fill" style={{ backgroundColor: color.hex }} />
                      <div>
                        <h3 className="font-display text-[1.55rem] tracking-[-0.04em] text-[var(--ink-strong)]">
                          {color.name}
                        </h3>
                        <p className="mt-1 text-[0.82rem] uppercase tracking-[0.16em] text-[var(--ink-subtle)]">
                          {color.brands}
                        </p>
                      </div>
                      <p className="text-[0.98rem] leading-7 text-[var(--ink-muted)]">{color.description}</p>
                    </article>
                  ))}
                </div>
                <ColorDisclaimer />
              </Reveal>

              <Reveal delay={120} className="surface-panel product-application-panel">
                <h2 className="text-[0.82rem] uppercase tracking-[0.24em] text-[var(--ink-subtle)]">Applications</h2>
                <div className="mt-7 grid gap-5">
                  {family.applications.map((application) => (
                    <article key={application.name} className="application-rail">
                      <h3 className="font-display text-[1.58rem] tracking-[-0.04em] text-[var(--ink-strong)]">
                        {application.name}
                      </h3>
                      <p className="text-[1.05rem] font-medium leading-[1.85] text-[var(--ink-primary)]">
                        {application.description}
                      </p>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-5 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <Reveal className="max-w-4xl">
              <SectionHeading
                eyebrow="Applications"
                title={applicationsTitles[family.slug]}
                body="Tell us where the product will be used so we can match the right detail."
              />
            </Reveal>

            <AnimatedApplicationsGrid applications={family.applications} />

            {family.slug === "boards" && (
              <div className="mt-8">
                <ColorDisclaimer />
              </div>
            )}
          </div>
        </section>
      )}

      <section className="px-5 py-12 md:px-8 lg:px-10 bg-[var(--surface-panel)] border-y border-[var(--line-soft)]">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="eyebrow">Quality Promise</span>
                <h2 className="mt-4 font-display text-2xl tracking-tight text-[var(--ink-strong)] md:text-3xl">
                  Engineered for extreme performance.
                </h2>
                <p className="mt-4 text-[1.1rem] font-medium leading-[1.85] text-[var(--ink-primary)]">
                  Every product we make is 100% waterproof, termite-proof, and fire-retardant. 
                  Built with dense internal bonding for stable fitting.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
                  <span className="font-medium text-[var(--ink-strong)]">Waterproof</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
                  <span className="font-medium text-[var(--ink-strong)]">Termite Proof</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
                  <span className="font-medium text-[var(--ink-strong)]">Fire Retardant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
                  <span className="font-medium text-[var(--ink-strong)]">Eco-Friendly</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-band px-5 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="callout-panel product-inquiry-panel">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mt-4 max-w-3xl">{family.cta.title}</h2>
            <p className="mt-5 max-w-2xl text-[1.1rem] font-medium leading-[1.85] text-[var(--ink-primary)]">
              {family.cta.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={family.cta.primaryHref} className="button-primary">
                {family.cta.primaryLabel}
              </Link>
              {family.cta.secondaryHref ? (
                <Link href={family.cta.secondaryHref} className="button-secondary">
                  {family.cta.secondaryLabel}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
