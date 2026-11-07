import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT, SERVING_AREAS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Honeybadger.AI",
  description:
    "Honeybadger.AI is an AI-powered technology company in Naroli, Dadra and Nagar Haveli. We build software with AI at the core and grow it through search and app stores.",
  path: "/about",
});

const PRINCIPLES = [
  { title: "Relentless", body: "Like the honey badger, we do not quit when a problem gets hard. We keep going until the system works in production." },
  { title: "Outcome-driven", body: "We measure ourselves on visits, leads, installs and hours saved, not on screens delivered." },
  { title: "Honest about AI", body: "We tell you when AI is the right tool and when a simple form or a database query will do." },
  { title: "Built to be found", body: "A product no one can find does not exist. Discoverability is part of the build, not an afterthought." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small, relentless team building AI-powered software."
        answer="Honeybadger.AI is a technology company based in Naroli, Dadra and Nagar Haveli. We build websites, apps and AI systems for businesses across India and abroad, then make sure customers can find them."
      >
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      </PageHero>

      <section aria-labelledby="principles" className="mx-auto max-w-6xl px-5 pb-16">
        <h2 id="principles" className="text-h2 max-w-3xl">What we stand for</h2>
        <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
          Four principles shape every project, from how we scope to how we report results.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="glass h-full p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="where" className="mx-auto max-w-6xl px-5 pb-24">
        <h2 id="where" className="text-h2 max-w-3xl">Where we work</h2>
        <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
          Our headquarters is in {CONTACT.address.display}. We serve clients across the regions below and work remotely with teams worldwide.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SERVING_AREAS.map((a) => (
            <li key={a} className="glass px-4 py-2 text-sm">{a}</li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}

