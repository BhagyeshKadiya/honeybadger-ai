import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { POSTS, getPost } from "@/content/blog";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    publishedTime: p.date,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <JsonLd data={articleSchema(p)} />
      <article className="mx-auto max-w-3xl px-5 pt-32 pb-16 sm:pt-40">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]} />
        <header className="mt-6">
          <h1 className="text-display" style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)" }}>{p.title}</h1>
          <p className="text-muted-foreground mt-4 text-sm">
            Published <time dateTime={p.date}>{fmt(p.date)}</time> · Last updated <time dateTime={p.updated}>{fmt(p.updated)}</time> · {p.readMinutes} min read
          </p>
        </header>
        <div className="mt-10 space-y-10">
          {p.sections.map((s) => (
            <section key={s.h2} aria-labelledby={s.h2.replace(/\W+/g, "-").toLowerCase()}>
              <h2 id={s.h2.replace(/\W+/g, "-").toLowerCase()} className="font-display text-2xl font-semibold tracking-tight">
                {s.h2}
              </h2>
              <p className="mt-3 text-lg font-medium">{s.answer}</p>
              {s.body?.map((b) => (
                <p key={b} className="text-muted-foreground mt-3 leading-relaxed">
                  {b}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <FinalCta />
    </>
  );
}

