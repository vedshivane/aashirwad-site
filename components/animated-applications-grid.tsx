"use client";

import { motion } from "motion/react";

import { Reveal } from "./reveal";
import type { ApplicationUse } from "@/lib/types";

const STAGGER_DELAY_MS = 70;
const HOVER_DURATION = 0.36;
const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AnimatedApplicationsGridProps {
  applications: ApplicationUse[];
}

export function AnimatedApplicationsGrid({ applications }: AnimatedApplicationsGridProps) {
  return (
    <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 md:grid-cols-3">
      {applications.map((application, index) => (
        <Reveal key={application.name} delay={index * STAGGER_DELAY_MS}>
          <motion.div
            className="surface-panel contact-panel h-full"
            whileHover={{ y: -6 }}
            transition={{ duration: HOVER_DURATION, ease: EASE_CURVE }}
          >
            <span className="block text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[var(--accent-red)]">
              0{index + 1}
            </span>
            <h3 className="mt-3 font-display text-[1.72rem] tracking-[-0.04em] text-[var(--ink-strong)]">
              {application.name}
            </h3>
            <p className="mt-4 text-[1.05rem] font-medium leading-[1.85] text-[var(--ink-primary)]">
              {application.description}
            </p>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}
