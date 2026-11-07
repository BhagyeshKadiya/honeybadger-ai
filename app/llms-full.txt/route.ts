import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/blog";
import { HOME_FAQ } from "@/content/faq";
import { CONTACT, SERVING_AREAS, SITE } from "@/lib/constants";
import { plainText } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const out: string[] = [
    `# ${SITE.name}: full description`,
    "",
    `${SITE.description}`,
    "",
    `Positioning: ${SITE.tagline}`,
    `Website: ${SITE.url}`,
    `Headquarters: ${CONTACT.address.display}`,
    `WhatsApp / phone: ${CONTACT.phoneDisplay}`,
    `Regions served: ${SERVING_AREAS.join(", ")}`,
    `Last updated: ${SITE.lastUpdated}`,
    "",
    "# Services",
  ];

  for (const s of SERVICES) {
    out.push(
      "",
      `## ${s.title}`,
      `URL: ${SITE.url}/services/${s.slug}`,
      s.answer,
      "",
      "Deliverables:",
      ...s.deliverables.map((d) => `- ${d}`),
      "",
      "Stack: " + s.stack.join(", "),
      "",
      "FAQ:",
      ...s.faq.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
    );
  }

  out.push("", "# Company FAQ", ...HOME_FAQ.flatMap((f) => ["", `Q: ${f.q}`, `A: ${f.a}`]));
  out.push("", "# Articles", ...POSTS.flatMap((p) => ["", `## ${p.title}`, `URL: ${SITE.url}/blog/${p.slug}`, ...p.sections.flatMap((s) => [`### ${s.h2}`, s.answer, ...(s.body ?? [])])]));

  return plainText(out.join("\n"));
}

