import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { POSTS } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog: AI, RAG, AEO, GEO and SEO",
  description: "Practical, answer-first articles on RAG, AI automation, AEO, GEO and SEO from the Honeybadger.AI team.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Straight answers on AI and search."
        answer="Short, answer-first articles on RAG, AI automation and ranking in Google and AI engines. Written to be useful and easy to quote."
      >
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      </PageHero>
      <section aria-label="Articles" className="mx-auto max-w-4xl px-5 pb-24">
        <ul className="space-y-4">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="glass hover:bg-muted/40 block p-6 transition-colors">
                <p className="text-muted-foreground font-mono text-xs">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time> · {p.readMinutes} min read
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold">{p.title}</h2>
                <p className="text-muted-foreground mt-2 text-sm">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

