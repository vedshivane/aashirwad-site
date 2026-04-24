"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { SlideshowChrome } from "./slideshow-chrome";

const boards = [
  {
    name: "Omni",
    src: "/images/boards/omni-board.png",
    detail: "Entry quality board finish",
  },
  {
    name: "PVC Aashirwad",
    src: "/images/boards/pvc-aashirwad-board.png",
    detail: "Aashirwad PVC board finish",
  },
  {
    name: "Hybrid PVC Aashirwad",
    src: "/images/boards/hybrid-pvc-aashirwad-board.png",
    detail: "Hybrid PVC finish",
  },
  {
    name: "WPC Aashirwad Board",
    src: "/images/boards/wpc-aashirwad-board.png",
    detail: "Top quality WPC board finish",
  },
];

export function BoardSlideshow({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % boards.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 p-6">
        <div className="relative h-full w-full">
          {boards.map((board, boardIndex) => (
            <motion.div
              key={board.name}
              initial={false}
              animate={{
                opacity: boardIndex === index ? 1 : 0,
                scale: boardIndex === index ? 1 : 0.985,
                y: boardIndex === index ? 0 : 10,
              }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              aria-hidden={boardIndex !== index}
            >
              <div className="relative h-full w-full rounded-[2rem] border border-[var(--line-soft)] bg-white/72 p-4 shadow-[0_26px_60px_-38px_rgba(77,43,35,0.26)] backdrop-blur-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                  <Image
                    src={board.src}
                    alt={board.name}
                    fill
                    sizes="(min-width: 1024px) 35rem, 100vw"
                    unoptimized
                    className="object-contain object-center p-2"
                    priority={boardIndex === 0}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SlideshowChrome
        title={boards[index].name}
        subtitle={boards[index].detail}
        items={boards}
        index={index}
      />
    </div>
  );
}
