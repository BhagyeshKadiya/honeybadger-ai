import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SERVICES, getService } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CtaLink, WhatsAppLink } from "@/components/CtaLinks";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageHero eyebrow="Service" title={s.title} answer={s.answer}>
        <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact" size="lg">
            Start your project
          </CtaLink>
          <WhatsAppLink size="lg" href={waLink(`Hi Honeybadger.AI, I'm interested in ${s.title}.`)} />
        </div>
      </PageHero>

      <article className="mx-auto max-w-6xl space-y-20 px-5 pb-24">
        <section aria-labelledby="what">
          <h2 id="what" className="text-h2 max-w-3xl">
            What you get with {s.title}
          </h2>
          <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
            {s.title} at Honeybadger.AI is delivered as a scoped project with weekly demos. These are the standard deliverables, adjusted to your goals.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {s.deliverables.map((d) => (
              <li key={d} className="glass flex items-start gap-3 p-4 text-sm">
                <Check className="text-brand mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="outcomes">
          <h2 id="outcomes" className="text-h2 max-w-3xl">
            Why teams choose this
          </h2>
          <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
            The aim is practical: faster delivery, fewer manual steps and a product that customers and AI engines can find. Here is what that means in practice.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {s.outcomes.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.08}>
                <div className="glass h-full p-6">
                  <ServiceIcon name={s.icon} className="text-brand size-5" />
                  <h3 className="font-display mt-4 text-lg font-semibold">{o.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="compare">
          <h2 id="compare" className="text-h2 max-w-3xl">
            How we compare with a typical vendor
          </h2>
          <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
            Differences show up in the details: rendering, measurement and handover. This table summarises what to expect from us versus a typical provider.
          </p>
          <div className="glass mt-8 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">Honeybadger.AI compared with a typical vendor for {s.title}</caption>
              <thead>
                <tr className="border-border border-b">
                  <th scope="col" className="p-4 font-medium">Aspect</th>
                  <th scope="col" className="text-brand p-4 font-medium">Honeybadger.AI</th>
                  <th scope="col" className="text-muted-foreground p-4 font-medium">Typical vendor</th>
                </tr>
              </thead>
              <tbody>
                {s.comparison.map((r) => (
                  <tr key={r.label} className="border-border border-b last:border-0">
                    <th scope="row" className="p-4 font-medium">{r.label}</th>
                    <td className="p-4">{r.us}</td>
                    <td className="text-muted-foreground p-4">{r.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="stack">
          <h2 id="stack" className="text-h2 max-w-3xl">
            Technology we use
          </h2>
          <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
            We pick proven tools and avoid lock-in, so you own the code and can move on whenever you choose.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li key={t} className="glass font-display px-4 py-2 text-sm">{t}</li>
            ))}
          </ul>
        </section>
      </article>

      <Faq
        id="service-faq"
        items={s.faq}
        title={`${s.title}: common questions`}
        answer="Direct answers to what buyers ask before they start."
      />

      <section aria-label="Related services" className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="font-display text-xl font-semibold">Related services</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/services/${r.slug}`} className="glass hover:bg-muted/40 flex h-full flex-col gap-1 p-4 transition-colors">
                <span className="font-medium">{r.title}</span>
                <span className="text-muted-foreground text-sm">{r.valueProp}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
