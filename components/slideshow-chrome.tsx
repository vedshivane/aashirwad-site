"use client";

import { AnimatePresence, motion } from "motion/react";

type SlideshowChromeProps = {
  title: string;
  subtitle: string;
  items: readonly { name: string }[];
  index: number;
};

export function SlideshowChrome({
  title,
  subtitle,
  items,
  index,
}: SlideshowChromeProps) {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex flex-col items-center gap-3 sm:inset-x-6 sm:bottom-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-[26rem] rounded-[1.75rem] border border-white/70 bg-[rgba(255,252,248,0.9)] px-5 py-3 text-center shadow-[0_18px_45px_-26px_rgba(54,35,24,0.35)] backdrop-blur-xl"
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--ink-strong)]">
            {title}
          </p>
          <p className="mt-1 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:color-mix(in_oklab,var(--ink-subtle)_78%,white)]">
            {subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-2 rounded-full border border-black/5 bg-white/72 px-3 py-2 shadow-[0_14px_28px_-22px_rgba(0,0,0,0.45)] backdrop-blur-md">
        {items.map((item, itemIndex) => (
          <div
            key={item.name}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              itemIndex === index
                ? "w-10 bg-[var(--accent-red)]"
                : "w-4 bg-black/12"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
