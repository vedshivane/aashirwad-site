"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import { SlideshowChrome } from "./slideshow-chrome";

const slides = [
  {
    name: "WPC Doors",
    src: "/images/doors/ecoteak-501.png",
    detail: "Door range",
    paddingClassName: "p-1",
  },
  {
    name: "WPC Frames",
    src: "/images/frames/frame-ecoteak.png",
    detail: "Frame range",
    paddingClassName: "",
  },
  {
    name: "PVC Boards",
    src: "/images/boards/pvc-aashirwad-board.png",
    detail: "Board range",
    paddingClassName: "p-2",
  },
  {
    name: "Designer Doors",
    src: "/images/doors/white-solid-designed.png",
    detail: "Door range",
    paddingClassName: "p-1",
  },
  {
    name: "Premium Frames",
    src: "/images/frames/frame-coffee-black.png",
    detail: "Frame range",
    paddingClassName: "",
  },
  {
    name: "WPC Boards",
    src: "/images/boards/wpc-aashirwad-board.png",
    detail: "Board range",
    paddingClassName: "p-2",
  },
] as const;

export function AboutProductSlideshow({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 p-6">
        <div className="relative h-full w-full">
          {slides.map((slide, slideIndex) => (
            <motion.div
              key={slide.src}
              initial={false}
              animate={{
                opacity: slideIndex === index ? 1 : 0,
                scale: slideIndex === index ? 1 : 0.992,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              aria-hidden={slideIndex !== index}
            >
              <div className="relative h-full w-full">
                <Image
                  src={slide.src}
                  alt={slide.name}
                  fill
                  sizes="(min-width: 1024px) 35rem, 100vw"
                  unoptimized
                  className={`object-contain object-center ${slide.paddingClassName}`}
                  priority={slideIndex === 0}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SlideshowChrome
        title={slides[index].name}
        subtitle={slides[index].detail}
        items={slides}
        index={index}
      />
    </div>
  );
}
