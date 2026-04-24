import Image from "next/image";

interface BrandMarkProps {
  decorative?: boolean;
  className?: string;
}

export function BrandMark({
  decorative = true,
  className,
}: BrandMarkProps) {
  return (
    <Image
      src="/brand-symbol.png"
      alt={decorative ? "" : "Eco Aashirwad symbol"}
      aria-hidden={decorative}
      width={465}
      height={377}
      className={className}
    />
  );
}
