import { OG_SIZE, renderOg } from "@/lib/og";
import { getPost } from "@/content/blog";

export const alt = "Honeybadger.AI article";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return renderOg({ title: p?.title ?? "Honeybadger.AI", eyebrow: "Blog" });
}

