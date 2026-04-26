import type { Metadata } from "next";

import { LocationSection } from "@/components/location-section";
import { Reveal } from "@/components/reveal";
import { contactPanels } from "@/lib/content";
import { CollabSection } from "@/components/collab-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Eco Aashirwad for best-quality WPC doors, frames, and boards. Share your category, quantity, and size — we serve dealers, builders, and architects across South India.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="product-hero-section product-hero-section-contact px-5 pb-14 pt-8 md:px-8 md:pb-18 md:pt-10 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="contact-hero-shell">
            <Reveal className="product-hero-copy">
              <p className="eyebrow">Contact</p>
              <h1 className="display-title product-page-title text-[var(--ink-strong)]">
                Tell us what you need.
              </h1>
              <p className="hero-copy hero-copy-wide">
                Share the category, quantity, finish, current operations in South India, and any size, section, or thickness detail available.
              </p>
            </Reveal>

            <Reveal delay={120} className="contact-board">
              <div className="contact-checklist">
                <div className="contact-check-item">
                  <span>01</span>
                  <strong>Category</strong>
                  <p>Doors, frames, boards, or a mixed requirement.</p>
                </div>
                <div className="contact-check-item">
                  <span>02</span>
                  <strong>Quantity</strong>
                  <p>Approximate quantity or project scale.</p>
                </div>
                <div className="contact-check-item">
                  <span>03</span>
                  <strong>Finish</strong>
                  <p>Frame finish if relevant, plus any preferred tone direction.</p>
                </div>
                <div className="contact-check-item">
                  <span>04</span>
                  <strong>Operations</strong>
                  <p>Current operations in South India, plus any drawing, section, or thickness detail available.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CollabSection />

      <LocationSection
        eyebrow="Location"
        title="Open the store location directly from the contact page."
        body="The interactive map makes it easier to get directions, confirm the address, and share the store location with project teams."
      />

      <section className="page-band px-5 py-16 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-3">
          {contactPanels.map((panel, index) => (
            <Reveal key={panel.title} delay={index * 100} className="surface-panel contact-panel">
              <p className="eyebrow">{panel.title}</p>
              <p className="mt-5 text-[1.02rem] leading-8 text-[var(--ink-muted)]">{panel.description}</p>
              {"href" in panel ? (
                <a href={panel.href} className="mt-8 inline-flex text-link">
                  {panel.value}
                </a>
              ) : (
                <p className="mt-8 font-display text-[1.72rem] tracking-[-0.04em] text-[var(--ink-strong)]">
                  {panel.value}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
