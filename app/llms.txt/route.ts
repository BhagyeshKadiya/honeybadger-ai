import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/blog";
import { CONTACT, SERVING_AREAS, SITE } from "@/lib/constants";
import { plainText } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Headquarters: ${CONTACT.address.display}. WhatsApp: ${CONTACT.phoneDisplay}. Website: ${SITE.url}`,
    `Serving: ${SERVING_AREAS.join(", ")}.`,
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.valueProp}`),
    "",
    "## Key pages",
    `- [Home](${SITE.url}/): ${SITE.tagline}`,
    `- [RAG and private-knowledge AI](${SITE.url}/rag-ai): flagship RAG implementation landing page`,
    `- [Services](${SITE.url}/services)`,
    `- [Work](${SITE.url}/work)`,
    `- [About](${SITE.url}/about)`,
    `- [Contact](${SITE.url}/contact)`,
    `- [Blog](${SITE.url}/blog)`,
    "",
    "## Articles",
    ...POSTS.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`),
    "",
    "## Optional",
    `- [Full description](${SITE.url}/llms-full.txt)`,
  ];
  return plainText(lines.join("\n"));
}
