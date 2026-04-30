"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { ColorDisclaimer } from "./color-disclaimer";
import { Reveal } from "./reveal";

const CNC_SLIDES = [
  {
    name: "Ivory — Raised Panel",
    colour: "Ivory",
    colourHex: "#f2ebdc",
    src: "/images/doors/cnc-door-ivory-1.png",
    detail: "Traditional raised-panel CNC moulding in ivory finish",
  },
  {
    name: "Ivory — Wave & Circles",
    colour: "Ivory",
    colourHex: "#f2ebdc",
    src: "/images/doors/cnc-door-ivory-2.png",
    detail: "Wave-curve with circle accents in ivory finish",
  },
  {
    name: "Grey — Raised Panel",
    colour: "Grey",
    colourHex: "#9b9ea2",
    src: "/images/doors/cnc-door-grey-1.png",
    detail: "Traditional raised-panel CNC moulding in grey finish",
  },
  {
    name: "Grey — Wave & Circles",
    colour: "Grey",
    colourHex: "#9b9ea2",
    src: "/images/doors/cnc-door-grey-2.png",
    detail: "Wave-curve with circle accents in grey finish",
  },
] as const;

const AUTOPLAY_INTERVAL = 3200;

export function CncDoorsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % CNC_SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setIndex((prev) => (prev - 1 + CNC_SLIDES.length) % CNC_SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = CNC_SLIDES[index];

  return (
    <section className="px-5 py-12 md:px-8 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          {/* Header */}
          <div>
            <p className="eyebrow">CNC Doors</p>
            <h2 className="section-title mt-3 max-w-[14ch]">
              Precision CNC routed designs.
            </h2>
            <p className="mt-4 max-w-[38rem] text-[1.08rem] leading-[1.88] text-[var(--ink-muted)]">
              Decorative CNC moulded door shutters available in ivory and grey. Each design is
              computer-routed for clean, consistent panel patterns.
            </p>
          </div>
        </Reveal>

        {/* Slideshow + thumb rail */}
        <Reveal delay={120} className="mt-10 sm:mt-12">
          <div
            className="grid gap-6 lg:grid-cols-[1fr_auto]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Main stage */}
            <div className="surface-panel overflow-hidden">
              <div className="relative">
                {/* Slide viewport */}
                <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[1.4rem] bg-[var(--surface-ground)] sm:min-h-[520px]">
                  {/* Subtle grid texture */}
                  <div
                    className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,#000_1px,transparent_1.5px)]"
                    style={{ backgroundSize: "28px 28px" }}
                  />

                  {/* Glow halo matches current colour */}
                  <div
                    className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
                    style={{ backgroundColor: slide.colourHex, opacity: 0.18 }}
                  />

                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={slide.name}
                      initial={{ opacity: 0, scale: 0.97, x: 24 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 1.02, x: -24 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="relative z-10 flex h-[380px] w-[180px] items-center justify-center sm:h-[480px] sm:w-[230px]"
                    >
                      <Image
                        src={slide.src}
                        alt={slide.name}
                        fill
                        sizes="(min-width: 640px) 230px, 180px"
                        unoptimized
                        className="object-contain drop-shadow-[14px_24px_36px_rgba(0,0,0,0.22)]"
                        priority={index === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Prev / Next arrows */}
                <button
                  onClick={prev}
                  aria-label="Previous door design"
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--line-soft)] bg-white/80 p-2.5 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md sm:left-4"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  aria-label="Next door design"
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--line-soft)] bg-white/80 p-2.5 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md sm:right-4"
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Caption bar */}
              <div className="flex items-center justify-between gap-4 border-t border-[var(--line-soft)] px-5 py-4 sm:px-7 sm:py-5">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={slide.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      className="text-[1.05rem] font-semibold text-[var(--ink-strong)]"
                    >
                      {slide.name}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-1 text-[0.9rem] text-[var(--ink-subtle)]">{slide.detail}</p>
                </div>

                {/* Dot nav */}
                <div className="flex shrink-0 items-center gap-2">
                  {CNC_SLIDES.map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to ${s.name}`}
                      className={`h-2 rounded-full transition-all duration-400 ${
                        i === index
                          ? "w-8 bg-[var(--accent-red)]"
                          : "w-2 bg-[var(--line-strong)] hover:bg-[var(--ink-subtle)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail rail */}
            <div className="flex gap-3 lg:flex-col lg:gap-4">
              {CNC_SLIDES.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Select ${s.name}`}
                  aria-pressed={i === index}
                  className={`group relative flex-1 overflow-hidden rounded-2xl border-2 transition-all lg:flex-none lg:w-[110px] lg:h-[160px] ${
                    i === index
                      ? "border-[var(--accent-red)] shadow-md"
                      : "border-[var(--line-soft)] opacity-72 hover:opacity-100 hover:border-[var(--line-strong)]"
                  }`}
                  style={{ minHeight: "80px" }}
                >
                  <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{ backgroundColor: s.colourHex, opacity: 0.35 }}
                  />
                  <Image
                    src={s.src}
                    alt={s.name}
                    fill
                    sizes="110px"
                    unoptimized
                    className="object-contain p-2"
                  />
                  {i === index && (
                    <motion.div
                      layoutId="cnc-thumb-ring"
                      className="absolute inset-0 rounded-[14px] border-2 border-[var(--accent-red)]"
                      transition={{ duration: 0.28 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <ColorDisclaimer className="mt-6" />

          {/* Prominent PDF download CTA */}
          <div className="mt-8 flex justify-center">
            <a
              href="/cnc-door-catalogue.pdf"
              download="EcoAashirwad-CNC-Door-Catalogue.pdf"
              className="group inline-flex items-center gap-3 rounded-2xl bg-[var(--accent-red)] px-7 py-4 text-[1rem] font-bold shadow-[0_4px_24px_-4px_color-mix(in_oklab,var(--accent-red)_52%,transparent)] transition-all hover:-translate-y-[2px] hover:bg-[var(--accent-red-deep)] hover:shadow-[0_8px_32px_-4px_color-mix(in_oklab,var(--accent-red)_60%,transparent)]"
              style={{ color: "white" }}
            >
              <DownloadIcon />
              <span className="leading-tight">
                Download CNC Door Catalogue
                <span className="ml-2 text-[0.72rem] font-extrabold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  PDF
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Icon helpers ───────────────────────────────────────────── */

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
