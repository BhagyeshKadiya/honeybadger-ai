import type { NextConfig } from "next";

/** Old content-marketing and performance-marketing routes, permanently redirected to "/". */
const REMOVED_ROUTES = [
  "/industries",
  "/real-estate",
  "/hospitality",
  "/e-commerce",
  "/ecommerce",
  "/content-factory",
  "/ai-content-factory",
  "/full-funnel-ads",
  "/performance-marketing",
  "/content-marketing",
  "/pillars",
  "/methodology",
  "/process",
  "/system",
  "/location",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return REMOVED_ROUTES.map((source) => ({ source, destination: "/", statusCode: 301 as const }));
  },
};

export default nextConfig;
