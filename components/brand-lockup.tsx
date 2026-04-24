import type { BrandAssetVariant } from "@/lib/types";
import { BrandMark } from "@/components/brand-mark";

interface BrandLockupProps {
  variant?: BrandAssetVariant;
  className?: string;
}

export function BrandLockup({
  variant = "compact",
  className,
}: BrandLockupProps) {
  if (variant === "symbol") {
    return (
      <div className={`brand-lockup brand-lockup-symbol ${className ?? ""}`}>
        <BrandMark decorative={false} className="brand-lockup-mark brand-lockup-mark-symbol" />
      </div>
    );
  }

  return (
    <div className={`brand-lockup brand-lockup-${variant} ${className ?? ""}`}>
      <BrandMark decorative={false} className={`brand-lockup-mark brand-lockup-mark-${variant}`} />
      <div className={`brand-lockup-wording brand-lockup-wording-${variant}`}>
        <span className="brand-lockup-eco">ECO</span>
        <span className="brand-lockup-name">Aashirwad</span>
      </div>
    </div>
  );
}
