export type ProductSlug = "doors" | "frames" | "boards";
export type BrandAssetVariant = "symbol" | "compact" | "social";

export interface MediaAsset {
  alt: string;
  caption?: string;
  kind: "illustration" | "brand-mark";
}

export interface BrandClaim {
  eyebrow: string;
  title: string;
  body: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  proof: string;
  icon:
    | "water"
    | "termite"
    | "fire"
    | "density"
    | "weather"
    | "eco"
    | "acoustic"
    | "finish";
}

export interface SpecGroup {
  title: string;
  note?: string;
  items: Array<{
    label: string;
    value: string;
    note?: string;
  }>;
  imageSrc?: string;
  imageAlt?: string;
  imageFit?: "contain" | "cover";
}

export interface MaterialColor {
  name: string;
  tone: string;
  brands: string;
  description: string;
  hex: string;
}

export interface ApplicationUse {
  name: string;
  description: string;
}

export interface InquiryCTA {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export interface RangeItem {
  name: string;
  label?: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface ProductRangeIntro {
  eyebrow: string;
  title: string;
  body: string;
  availabilityNote: string;
  featured: RangeItem;
  supporting: RangeItem[];
}

export interface RangeShowcase {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageFit?: "contain" | "cover";
  facts: string[];
  badge?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface ProductFamily {
  slug: ProductSlug;
  name: string;
  navLabel: string;
  strap: string;
  homeSummary: string;
  summary: string;
  materialPromise: string;
  bullets: string[];
  specs: SpecGroup[];
  colors: MaterialColor[];
  applications: ApplicationUse[];
  cta: InquiryCTA;
  media: MediaAsset;
  rangeIntro: ProductRangeIntro;
  rangeShowcases?: RangeShowcase[];
  showFinishes?: boolean;
}
