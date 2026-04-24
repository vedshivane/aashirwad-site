"use client";

import { motion } from "motion/react";

interface RibbonMarqueeProps {
  items: string[];
}

export function RibbonMarquee({ items }: RibbonMarqueeProps) {
  const repeated = [...items, ...items];

  return (
    <div className="ticker-window" aria-label="Material highlights">
      <motion.div
        className="ticker-track"
        animate={{ transform: ["translate3d(0, 0, 0)", "translate3d(-50%, 0, 0)"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="ticker-item">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
