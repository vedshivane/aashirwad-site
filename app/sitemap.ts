import type { MetadataRoute } from "next";

import { productFamilies } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact"];
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...productFamilies.map((family) => ({
      url: `${siteUrl}/products/${family.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
