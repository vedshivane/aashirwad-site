import type { FeatureCard } from "@/lib/types";

interface FeatureIconProps {
  icon: FeatureCard["icon"];
  className?: string;
}

const sharedProps = {
  fill: "none",
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
} as const;

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 1.85,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function FeatureIcon({ icon, className }: FeatureIconProps) {
  switch (icon) {
    case "water":
      return (
        <svg {...sharedProps} className={className}>
          <path d="M24 8.5C20.2 13.1 15.4 19.6 14 25.1C12.3 31.6 16.5 38 24 39.5C31.5 38 35.7 31.6 34 25.1C32.6 19.6 27.8 13.1 24 8.5Z" {...strokeProps} />
          <path d="M18.2 28.8C19.7 27.1 21.6 26.2 24 26.2C26.6 26.2 28.6 27.2 30.3 29" {...strokeProps} />
        </svg>
      );
    case "termite":
      return (
        <svg {...sharedProps} className={className}>
          <path d="M24 15.3C28.8 15.3 32 18.8 32 23.4C32 28.6 28.7 32.7 24 32.7C19.3 32.7 16 28.6 16 23.4C16 18.8 19.2 15.3 24 15.3Z" {...strokeProps} />
          <path d="M24 32.7V37.2M18.8 17.2L16 13.8M29.2 17.2L32 13.8" {...strokeProps} />
          <path d="M17.1 22.3L12.8 20.5M30.9 22.3L35.2 20.5M18 28.1L14.6 31.4M30 28.1L33.4 31.4" {...strokeProps} />
          <path d="M24 18.7V29.8M20.2 23.1H27.8" {...strokeProps} />
        </svg>
      );
    case "fire":
      return (
        <svg {...sharedProps} className={className}>
          <path d="M24 8.6C22.8 12.2 20.3 15 17.8 18.1C14.9 21.8 13 25.1 13 29.1C13 35.1 17.6 39.5 24 39.5C30.4 39.5 35 35.1 35 29.1C35 25.1 33.1 21.8 30.2 18.1C27.7 15 25.2 12.2 24 8.6Z" {...strokeProps} />
          <path d="M24 18.3C23 20.4 21.8 22 20.9 24C20 25.8 19.9 27.6 20.6 29.1C21.3 30.6 22.4 31.7 24 31.7C25.6 31.7 26.7 30.6 27.4 29.1C28.1 27.6 28 25.8 27.1 24C26.2 22 25 20.4 24 18.3Z" {...strokeProps} />
        </svg>
      );
    case "density":
      return (
        <svg {...sharedProps} className={className}>
          <rect x="14" y="14" width="20" height="6" rx="2.2" {...strokeProps} />
          <rect x="12" y="22" width="24" height="6.5" rx="2.2" {...strokeProps} />
          <rect x="10" y="31" width="28" height="6.5" rx="2.2" {...strokeProps} />
        </svg>
      );
    case "weather":
      return (
        <svg {...sharedProps} className={className}>
          <path d="M15.3 28.4C15.3 24.6 18.3 21.8 22.1 21.8C23 18.3 26 15.9 29.6 15.9C34.1 15.9 37.6 19.2 37.6 23.6C40.2 24 42.2 26.1 42.2 28.7C42.2 31.7 39.8 34.1 36.7 34.1H20.6C17.7 34.1 15.3 31.7 15.3 28.8V28.4Z" {...strokeProps} />
          <path d="M20.2 35.4L18.6 39M26 35.4L24.4 39M31.8 35.4L30.2 39" {...strokeProps} />
        </svg>
      );
    case "eco":
      return (
        <svg {...sharedProps} className={className}>
          <path d="M24 35.7C30.5 35.7 35.7 30.5 35.7 24C35.7 17.5 30.5 12.3 24 12.3C17.5 12.3 12.3 17.5 12.3 24C12.3 30.5 17.5 35.7 24 35.7Z" {...strokeProps} />
          <path d="M31 18.3C25.5 18.8 21.4 22 19.7 27.2C21 30.1 23.5 32 26.7 32C30.5 32 33.5 29.4 34.1 25.7C33.6 22.8 32.6 20.4 31 18.3Z" {...strokeProps} />
          <path d="M20.7 27.4C23 26.1 25.3 23.8 28 19.8" {...strokeProps} />
        </svg>
      );
    case "acoustic":
      return (
        <svg {...sharedProps} className={className}>
          <rect x="11.5" y="11.5" width="15.5" height="25" rx="3" {...strokeProps} />
          <path d="M16.8 16.2V31.8M21.4 16.2V31.8" {...strokeProps} />
          <path d="M31.6 19.2C34 20.8 35.5 22.8 35.5 24C35.5 25.2 34 27.2 31.6 28.8" {...strokeProps} />
          <path d="M35.8 15.2C39.1 17.6 41.2 20.8 41.2 24C41.2 27.2 39.1 30.4 35.8 32.8" {...strokeProps} />
        </svg>
      );
    case "finish":
      return (
        <svg {...sharedProps} className={className}>
          <rect x="13.5" y="14" width="17.5" height="20" rx="2.6" {...strokeProps} />
          <path d="M18.2 20.5H26.4M18.2 25.2H26.4" {...strokeProps} />
          <path d="M31.3 31.7L36.8 26.2L39.4 28.8L33.9 34.3" {...strokeProps} />
          <path d="M30.3 32.7L27.8 35.2" {...strokeProps} />
        </svg>
      );
    default:
      return null;
  }
}
