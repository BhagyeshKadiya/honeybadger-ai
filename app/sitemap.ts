import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const last = new Date(SITE.lastUpdated);
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/rag-ai", priority: 0.9 },
    { path: "/work", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
  ];
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), lastModified: last, changeFrequency: "monthly" as const, priority: r.priority })),
    ...SERVICES.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: last, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...POSTS.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
