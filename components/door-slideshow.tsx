"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { SlideshowChrome } from "./slideshow-chrome";

const slides = [
  {
    name: "EcoTeak 501",
    src: "/images/doors/ecoteak-501.png",
    detail: "Straight grain WPC teak finish",
  },
  {
    name: "Zigzag WPC",
    src: "/images/doors/zigzag-wood.png",
    detail: "Patterned routed WPC design",
  },
  {
    name: "Ivory Solid",
    src: "/images/doors/white-solid-panel.png",
    detail: "Plain WPC ivory door",
  },
  {
    name: "Grey Solid",
    src: "/images/doors/grey-solid-panel.png",
    detail: "Plain WPC grey door",
  },
  {
    name: "Ivory Solid Design",
    src: "/images/doors/white-solid-designed.png",
    detail: "WPC ivory door with routed design",
  },
  {
    name: "Grey Solid Design",
    src: "/images/doors/grey-solid-designed.png",
    detail: "WPC grey door with routed design",
  },
];

export function DoorSlideshow({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 p-6">
        <div className="relative h-full w-full drop-shadow-[0_22px_50px_rgba(0,0,0,0.18)]">
          {slides.map((slide, slideIndex) => (
            <motion.div
              key={slide.name}
              initial={false}
              animate={{ opacity: slideIndex === index ? 1 : 0 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="absolute inset-0"
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={slide.src}
                alt={slide.name}
                fill
                sizes="(min-width: 1024px) 35rem, 100vw"
                unoptimized
                className="object-contain object-center"
                priority={slideIndex === 0}
              />
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
