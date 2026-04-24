"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface LuxuryFloatProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDrag" | "onDragStart" | "onDragEnd"
  > {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
}

export function LuxuryFloat({
  children,
  className,
  delay = 0,
  distance = 12,
  duration = 8,
  ...props
}: LuxuryFloatProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, transform: "translate3d(0, 20px, 0) scale(0.99)" }}
      animate={
        reduceMotion
          ? {
              opacity: 1,
              transform: "translate3d(0, 0, 0) scale(1)",
            }
          : {
              opacity: 1,
              transform: [
                "translate3d(0, 0, 0) scale(1)",
                `translate3d(0, ${-distance}px, 0) scale(1.008)`,
                "translate3d(0, 0, 0) scale(1)",
              ],
            }
      }
      transition={{
        opacity: {
          duration: reduceMotion ? 0.01 : 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
        transform: {
          duration,
          delay,
          repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      whileHover={reduceMotion ? undefined : { transform: "translate3d(0, -6px, 0) scale(1.012)" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
