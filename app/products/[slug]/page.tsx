import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/product-page";
import { productFamilies, productFamilyLookup } from "@/lib/content";
import type { ProductSlug } from "@/lib/types";
import { absoluteUrl, siteName } from "@/lib/site";

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
  const title = `${family.name} | ${siteName}`;
  const description = `Best quality ${family.name.toLowerCase()} by Eco Aashirwad. ${family.summary}`;

  return {
    title: family.name,
    description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `/products/${slug}`,
      siteName,
      title,
      description,
      images: [
        {
          url: absoluteUrl("/images/home/collage.png"),
          width: 1200,
          height: 630,
          alt: `${siteName} ${family.name.toLowerCase()} — best quality WPC`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/images/home/collage.png")],
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
