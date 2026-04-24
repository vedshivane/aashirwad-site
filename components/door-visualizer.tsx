"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { ColorDisclaimer } from "./color-disclaimer";

type DoorVariant = {
  name: string;
  tone: string;
  color: string;
  imageSrc: string;
  thicknesses: string[];
  family: "solid" | "texture";
};

const SOLID_VARIANTS: DoorVariant[] = [
  {
    name: "Ivory",
    tone: "Clean solid finish with a warm ivory cast",
    color: "#f2ebd6",
    imageSrc: "/images/doors/white-solid-panel.png",
    thicknesses: ["26 mm", "30 mm"],
    family: "solid",
  },
  {
    name: "Grey",
    tone: "Deeper matte grey solid finish",
    color: "#72787b",
    imageSrc: "/images/doors/grey-solid-panel.png",
    thicknesses: ["26 mm", "30 mm"],
    family: "solid",
  },
];

const TEXTURE_VARIANTS: DoorVariant[] = [
  {
    name: "EcoTeak 501",
    tone: "Straight-grain premium WPC teak presentation",
    color: "#4d2b23",
    imageSrc: "/images/doors/ecoteak-501.png",
    thicknesses: ["26 mm", "30 mm"],
    family: "texture",
  },
  {
    name: "Teak",
    tone: "Fine grooved teak face with a darker wood tone",
    color: "#5d372e",
    imageSrc: "/images/doors/teak.png",
    thicknesses: ["26 mm"],
    family: "texture",
  },
  {
    name: "Zigzag Wood",
    tone: "Decorative routed zigzag woodgrain finish",
    color: "#a8714b",
    imageSrc: "/images/doors/zigzag-wood.png",
    thicknesses: ["26 mm"],
    family: "texture",
  },
];

const STANDARD_HEIGHTS = ["72", "75", "78", "81", "84", "87", "90", "93", "96"];
const STANDARD_WIDTHS = ["26", "28", "30", "32", "34", "36", "38"];

export function DoorVisualizer() {
  const [activeVariant, setActiveVariant] = useState<DoorVariant>(TEXTURE_VARIANTS[0]);

  const renderVariantList = (list: DoorVariant[]) =>
    list.map((variant) => {
      const isActive = activeVariant.name === variant.name;

      return (
        <button
          key={variant.name}
          onClick={() => setActiveVariant(variant)}
          role="radio"
          aria-checked={isActive}
          aria-label={`Select ${variant.name} design`}
          className={`group flex min-h-[5rem] w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
            isActive
              ? "relative z-10 scale-[1.02] border-[var(--accent-red)] bg-white shadow-md"
              : "border-[var(--line-soft)] bg-transparent hover:bg-white/50"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10 shadow-sm transition-transform group-hover:scale-110"
              style={{ backgroundColor: variant.color }}
            >
              <Image
                src={variant.imageSrc}
                alt=""
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </div>

            <div>
              <span className="block leading-tight font-medium text-[var(--ink-strong)]">
                {variant.name}
              </span>
              <span className="mt-1 block text-[0.85rem] text-[var(--ink-subtle)]">
                {variant.tone}
              </span>
              <span className="mt-1 block text-[0.82rem] font-medium text-[var(--accent-red)]">
                {variant.thicknesses.join(" / ")}
              </span>
            </div>
          </div>

          {isActive ? (
            <motion.div
              layoutId="door-active-dot"
              className="hidden h-2 w-2 rounded-full bg-[var(--accent-red)] md:block"
            />
          ) : null}
        </button>
      );
    });

  return (
    <div className="surface-panel mt-12 mb-6 overflow-hidden">
      <div className="grid items-center gap-12 p-4 lg:grid-cols-2 lg:p-10">
        <div className="relative flex min-h-[440px] items-center justify-center rounded-xl border border-[var(--line-soft)] bg-[#fdfaf5] shadow-inner lg:min-h-[580px]">
          <div
            className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1.5px)]"
            style={{ backgroundSize: "24px 24px" }}
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeVariant.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative flex h-[400px] w-[190px] items-center justify-center lg:h-[500px] lg:w-[240px]"
            >
              <div className="relative h-full w-full">
                <Image
                  src={activeVariant.imageSrc}
                  alt={`${activeVariant.name} door finish`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 240px, 190px"
                  className="object-contain drop-shadow-[18px_28px_40px_rgba(0,0,0,0.28)]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-display text-[1.8rem] tracking-tight text-[var(--ink-strong)] md:text-[2.2rem]">
              Door Configuration
            </h3>
            <p className="mt-2 text-[1.05rem] text-[var(--ink-muted)]">
              Thickness availability now follows the current handwritten product sheet.
            </p>
          </div>

          <div className="grid gap-6">
            <section>
              <h4 className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Solid Colours
                <span className="ml-2 normal-case tracking-normal text-[var(--ink-muted)]">
                  (26 mm and 30 mm)
                </span>
              </h4>
              <div className="grid gap-3">{renderVariantList(SOLID_VARIANTS)}</div>
            </section>

            <section>
              <h4 className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Texture Finishes
                <span className="ml-2 normal-case tracking-normal text-[var(--ink-muted)]">
                  (see per-design thickness)
                </span>
              </h4>
              <div className="grid gap-3">{renderVariantList(TEXTURE_VARIANTS)}</div>
            </section>

            <section className="grid gap-4 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-ground)] p-5 md:grid-cols-2">
              <div>
                <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  Standard Heights
                </h4>
                <p className="mt-3 text-[1rem] leading-7 text-[var(--ink-muted)]">
                  {STANDARD_HEIGHTS.join(", ")} in
                </p>
              </div>
              <div>
                <h4 className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  Standard Widths
                </h4>
                <p className="mt-3 text-[1rem] leading-7 text-[var(--ink-muted)]">
                  {STANDARD_WIDTHS.join(", ")} in
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 lg:px-8">
        <ColorDisclaimer />
      </div>
    </div>
  );
}
