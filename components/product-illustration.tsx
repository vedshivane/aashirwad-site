import { BoardSlideshow } from "./board-slideshow";
import { DoorSlideshow } from "./door-slideshow";
import { FrameSlideshow } from "./frame-slideshow";
import type { ProductSlug } from "@/lib/types";

interface ProductIllustrationProps {
  slug: ProductSlug;
  className?: string;
}

export function ProductIllustration({ slug, className }: ProductIllustrationProps) {
  if (slug === "frames") {
    return <FrameSlideshow className={className} />;
  }

  if (slug === "boards") {
    return <BoardSlideshow className={className} />;
  }

  return <DoorSlideshow className={className} />;
}
