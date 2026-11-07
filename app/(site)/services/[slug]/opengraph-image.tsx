import { OG_SIZE, renderOg } from "@/lib/og";
import { getService } from "@/content/services";

export const alt = "Honeybadger.AI service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  return renderOg({ title: s?.title ?? "Honeybadger.AI", eyebrow: "Service" });
}

