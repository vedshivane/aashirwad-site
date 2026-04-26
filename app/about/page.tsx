import type { Metadata } from "next";
import Link from "next/link";

import { AboutProductSlideshow } from "@/components/about-product-slideshow";
import { ColorDisclaimer } from "@/components/color-disclaimer";
import { LocationSection } from "@/components/location-section";
import { LuxuryFloat } from "@/components/luxury-float";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { aboutValues } from "@/lib/content";
import { parseBrandText } from "@/lib/parse-brand";

export const metadata: Metadata = {
  title: "About",
  description: "ECOAashirwad WPC doors, frames, and boards built around strength and density.",
};

export default function AboutPage() {
  return (
    <>
      <section className="product-hero-section product-hero-section-frames px-5 pb-14 pt-8 md:px-8 md:pb-18 md:pt-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="product-hero-shell">
            <Reveal className="product-hero-copy">
              <p className="eyebrow">About</p>
              <h1 className="display-title product-page-title text-[var(--ink-strong)]">
                Premium WPC focused on strength, density, and resin.
              </h1>
              <p className="hero-copy hero-copy-wide">
                For over a decade, {parseBrandText("ECOAashirwad has focused on doors, frames, and boards built for stable sections, strong holding power, and lower upkeep.")}
              </p>
              <p className="hero-copy hero-copy-wide">
                Current operations are focused in South India.
              </p>
              <div className="product-tone-row">
                <span className="tone-pill">Over a decade</span>
                <span className="tone-pill">Resin bond</span>
                <span className="tone-pill">High-density build</span>
              </div>
            </Reveal>

            <Reveal delay={120} className="product-hero-stage product-stage-frames">
              <div className="hero-light-beam hero-light-beam-left" />
              <div className="hero-light-beam hero-light-beam-right" />
              <div className="hero-illustration-ring" />
              <div className="product-stage-grid" />
              <LuxuryFloat delay={0.18} distance={8} duration={7.6} className="product-hero-art">
                <AboutProductSlideshow className="relative z-[2] mx-auto h-auto w-full max-w-[31rem]" />
              </LuxuryFloat>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 pb-2">
        <ColorDisclaimer />
      </div>

      <section className="page-band px-5 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.84fr_1.16fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Standards"
              title="A premium WPC range setting a higher quality benchmark in the Indian market."
              body="The focus stays on resin bonding, density, finish quality, and long service life."
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {aboutValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 120} className="surface-panel about-value-panel">
                <h2 className="font-display text-[1.9rem] tracking-[-0.05em] text-[var(--ink-strong)]">
                  {value.title}
                </h2>
                <p className="mt-5 text-[1.02rem] leading-8 text-[var(--ink-muted)]">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LocationSection
        eyebrow="Location"
        title="Our Hyderabad location serves current South India operations."
        body="The map below points directly to the store so architects, dealers, builders, and project buyers can locate the business without relying on plain address text."
      />

      <section className="px-5 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="callout-panel product-inquiry-panel">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mt-4 max-w-3xl">
              Tell us what you need.
            </h2>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="button-primary">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
