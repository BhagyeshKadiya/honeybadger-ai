import { OG_SIZE, renderOg } from "@/lib/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: SITE.tagline, eyebrow: "AI development company · India" });
}

