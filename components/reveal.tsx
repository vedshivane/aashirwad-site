"use client";

import type { HTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDrag" | "onDragStart" | "onDragEnd"
  > {
  delay?: number;
}

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`reveal ${className ?? ""}`}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              transform: "translate3d(0, 16px, 0) scale(0.993)",
            }
      }
      animate={{
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.48,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
