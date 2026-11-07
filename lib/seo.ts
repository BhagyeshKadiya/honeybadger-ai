import type { Metadata } from "next";
import { SITE } from "./constants";

interface PageMeta {
  title: string;
  description: string;
  /** Path beginning with "/" */
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

export function absoluteUrl(path = "/") {
  return `${SITE.url}${path === "/" ? "" : path}`;
}

/**
 * Per-page metadata: canonical, hreflang en-IN, OpenGraph, Twitter.
 * OG images come from the `opengraph-image.tsx` file convention (next/og),
 * so they are intentionally not listed here.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  noIndex,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { "en-IN": url, "x-default": url },
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
