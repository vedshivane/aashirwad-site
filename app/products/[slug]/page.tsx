import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/product-page";
import { productFamilies, productFamilyLookup } from "@/lib/content";
import type { ProductSlug } from "@/lib/types";

interface ProductRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return productFamilies.map((family) => ({
    slug: family.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isProductSlug(slug)) {
    return {
      title: "Product",
    };
  }

  const family = productFamilyLookup[slug];

  return {
    title: family.name,
    description: `Best quality ${family.name.toLowerCase()} by Eco Aashirwad. ${family.summary}`,
    alternates: {
      canonical: `/products/${slug}`,
    },
  };
}

export default async function ProductSlugPage({ params }: ProductRouteProps) {
  const { slug } = await params;

  if (!isProductSlug(slug)) {
    notFound();
  }

  const family = productFamilyLookup[slug];

  return <ProductPage family={family} />;
}

function isProductSlug(value: string): value is ProductSlug {
  return value === "doors" || value === "frames" || value === "boards";
}
