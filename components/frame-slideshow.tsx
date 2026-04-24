"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { frameColors } from "@/lib/content";
import { SlideshowChrome } from "./slideshow-chrome";

const frames = [
  {
    ...frameColors[0],
    src: "/images/frames/frame-sandalwood.png",
  },
  {
    ...frameColors[1],
    src: "/images/frames/frame-ecoteak.png",
  },
  {
    ...frameColors[2],
    src: "/images/frames/frame-coffee-black.png",
  },
];

export function FrameSlideshow({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden ${className ?? ""}`}>
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 p-6">
        <div className="relative h-full w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          {frames.map((frame, frameIndex) => (
            <motion.div
              key={frame.name}
              initial={false}
              animate={{
                opacity: frameIndex === index ? 1 : 0,
                scale: frameIndex === index ? 1 : 0.992,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              aria-hidden={frameIndex !== index}
            >
              <Image
                src={frame.src}
                alt={frame.name}
                fill
                sizes="(min-width: 1024px) 35rem, 100vw"
                className="object-contain object-center"
                priority={frameIndex === 0}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <SlideshowChrome
        title={frames[index].name}
        subtitle={frames[index].brands}
        items={frames}
        index={index}
      />
    </div>
  );
}
