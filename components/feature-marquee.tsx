"use client";

import { motion } from "motion/react";
import { featuresBlock } from "@/lib/content";

export function FeatureMarquee() {
  const content = featuresBlock.map(f => f.title);
  
  return (
    <div className="w-full overflow-hidden bg-[var(--accent-red)] py-4 text-[color:var(--surface-ground)] border-y border-[var(--line-strong)]">
      <div className="relative flex max-w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double the content for smooth infinite scrolling */}
          {[...content, ...content, ...content, ...content].map((title, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-6 text-sm font-semibold uppercase tracking-widest">{title}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--surface-ground)] opacity-40"></span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
