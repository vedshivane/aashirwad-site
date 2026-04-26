import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LuxuryFloat } from "@/components/luxury-float";
import { ProductIllustration } from "@/components/product-illustration";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { VisionSection } from "@/components/vision-section";
import { CollabSection } from "@/components/collab-section";
import { FeatureMarquee } from "@/components/feature-marquee";
import { ColorDisclaimer } from "@/components/color-disclaimer";
import {
  homeHero,
  productFamilies,
  standardsBlock,
  featuresBlock,
} from "@/lib/content";

import { BrandText } from "@/components/brand-text";
import { LocationSection } from "@/components/location-section";

import { parseBrandText } from "@/lib/parse-brand";
import { contactEmail } from "@/lib/content";
import {
  absoluteUrl,
  businessCoordinates,
  businessMapUrl,
  businessPhone,
  heroImagePath,
  siteAlternateNames,
  siteDescription,
  siteName,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Best Quality WPC Doors, Frames & Boards | Eco Aashirwad",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": absoluteUrl("/#organization"),
        name: siteName,
        alternateName: siteAlternateNames,
        url: absoluteUrl("/"),
        description: siteDescription,
        email: contactEmail,
        telephone: businessPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "14-1-334, behind prakash theatre, Aghapura, Mangalhat",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: businessCoordinates.latitude,
          longitude: businessCoordinates.longitude,
        },
        hasMap: businessMapUrl,
        areaServed: {
          "@type": "Place",
          name: "South India",
        },
        knowsAbout: ["WPC doors", "WPC frames", "PVC boards", "WPC boards"],
        image: [absoluteUrl(heroImagePath), absoluteUrl("/brand-symbol.png")],
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand-symbol-square.png"),
        },
        sameAs: [businessMapUrl],
        priceRange: "Enquiry based",
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteName,
        alternateName: siteAlternateNames,
        description: siteDescription,
        inLanguage: "en-IN",
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
      },
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/#webpage"),
        url: absoluteUrl("/"),
        name: `${siteName} | Best Quality WPC Doors, Frames & Boards by Eco Aashirwad`,
        description: siteDescription,
        inLanguage: "en-IN",
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: {
          "@id": absoluteUrl("/#organization"),
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(heroImagePath),
        },
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/#product-categories"),
        name: "EcoAashirwad product categories",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: productFamilies.length,
        itemListElement: productFamilies.map((family, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/products/${family.slug}`),
          name: family.name,
          description: family.homeSummary,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <section className="hero-section px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="hero-shell">
            <Reveal className="hero-copy-column">
              <div className="hero-kicker-row">
                <span className="hero-brand-chip">
                  <BrandText />
                </span>
                <span className="hero-kicker-divider" />
                <p className="hero-kicker-copy">WPC doors, frames, and boards</p>
              </div>

              <p className="eyebrow text-[var(--accent-red)]">{homeHero.eyebrow}</p>
              <h1 className="display-title hero-title leading-[0.88]">{homeHero.title}</h1>
              <p className="hero-copy hero-copy-wide mt-4">{parseBrandText(homeHero.description)}</p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link href="/contact" className="button-primary px-10 py-5 text-base">
                  Contact us
                </Link>
                <Link href="/products/frames" className="button-secondary px-10 py-5 text-base">
                  View Catalogue
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120} className="hero-stage-shell hero-stage-shell-home">
              <div className="hero-light-beam hero-light-beam-left" />
              <div className="hero-light-beam hero-light-beam-right" />

              <div className="hero-note hero-note-left hero-note-left-home">
                <span className="text-[var(--accent-red)]">Recyclable material</span>
                <p>Engineered with reusable material value, reducing waste while supporting durable applications.</p>
              </div>

              <LuxuryFloat delay={0.15} distance={8} duration={7.2} className="hero-stage-art">
                <div className="hero-collage-shell">
                  <div className="hero-collage-card">
                    <Image
                      src="/images/home/collage.png"
                      alt="Eco Aashirwad collage showing doors, frames, boards, and branded product packaging."
                      fill
                      priority
                      sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 92vw"
                      className="hero-collage-image"
                    />
                  </div>
                </div>
              </LuxuryFloat>

              <div className="hero-note hero-note-right">
                <span>High density</span>
                <p>Built for screw holding, stability, and daily use.</p>
              </div>
            </Reveal>
          </div>

        <Reveal delay={100} className="hero-proof-ledger mt-8 md:mt-16">
              {homeHero.proofPoints.map((point) => (
                <div key={point.label} className="hero-proof-item">
                  <span>{point.label}</span>
                  <strong>{point.value}</strong>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <FeatureMarquee />

        <VisionSection />

        <section className="page-band px-5 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <Reveal className="standards-panel">
              <SectionHeading
                eyebrow={parseBrandText(standardsBlock.eyebrow)}
                title={parseBrandText(standardsBlock.title)}
                body={parseBrandText(standardsBlock.body)}
              />

            <div className="standards-points">
              {standardsBlock.points.map((point) => (
                <span key={point} className="standards-pill">
                  {point}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-16 lg:px-10 bg-[var(--surface-panel)]">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading
              eyebrow="The Essentials"
              title="Built for the toughest conditions."
              body="Our focus is on providing a product that solves every problem traditional timber has."
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuresBlock.map((feature, i) => (
                <Reveal 
                  key={i} 
                  delay={i * 70}
                  className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-ground)] p-6 md:p-8"
                >
                  <h3 className="font-display text-xl font-medium tracking-tight md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">
                    {feature.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="range-header">
            <SectionHeading
              eyebrow="Portfolio"
              title="Doors. Frames. Boards."
              body="Architectural-grade products engineered for stability, durability, and daily use."
            />
          </Reveal>

          <div className="mt-10 grid gap-8 sm:mt-12 md:gap-12">
            {productFamilies.map((family, index) => (
              <div
                key={family.slug}
                className={`product-showcase ${index % 2 === 1 ? "product-showcase-reverse" : ""}`}
              >
                <Reveal delay={index * 80} className="product-showcase-copy">
                  <p className="product-number">0{index + 1}</p>
                  <p className="eyebrow">{family.name}</p>
                  <h2 className="section-title range-product-title mt-4">{family.strap}</h2>
                  <p className="mt-5 max-w-xl text-[1.08rem] leading-8 text-[var(--ink-muted)]">
                    {parseBrandText(family.homeSummary)}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href={`/products/${family.slug}`} className="button-primary">
                      See {family.navLabel.toLowerCase()}
                    </Link>
                    <Link href="/contact" className="text-link">
                      Contact us
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={index * 80 + 60} className={`product-stage product-stage-${family.slug}`}>
                  <div className="product-stage-grid" />
                  <div className="product-stage-halo" />
                  <LuxuryFloat
                    delay={0.16 + index * 0.08}
                    distance={7}
                    duration={7.6 + index * 0.4}
                    className="relative z-[2] mx-auto w-full max-w-[28rem]"
                  >
                    <ProductIllustration slug={family.slug} className="relative z-[2] mx-auto h-auto w-full max-w-[28rem]" />
                  </LuxuryFloat>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-8 px-1">
            <ColorDisclaimer />
          </div>
        </div>
      </section>

      <CollabSection />
      <LocationSection
        eyebrow="Visit"
        title="Visit the Hyderabad store."
        body="Use the interactive map to locate the store, get directions, and verify the current showroom location before you visit."
      />

      <section className="page-band px-5 py-12 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="callout-panel product-inquiry-panel final-cta-panel">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mt-4 max-w-3xl">
              Send your requirement.
            </h2>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-8 text-[var(--ink-muted)]">
              Share the category, quantity, city, and any size or section detail available.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="button-primary">
                Go to contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
