import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getService } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { RagSpotlight } from "@/components/sections/RagSpotlight";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { CtaLink, WhatsAppLink } from "@/components/CtaLinks";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { waLink } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "RAG Implementation & Private AI Chatbots | Honeybadger.AI",
  description:
    "Build a private-knowledge AI chatbot or copilot with RAG: document ingestion, embeddings, vector database, citations and guardrails. RAG implementation company in India.",
  path: "/rag-ai",
  keywords: ["RAG implementation company", "private knowledge chatbot", "enterprise RAG India", "AI copilot for documents"],
});

const RISKS = [
  { title: "Hallucinations", fix: "Answers are grounded in retrieved passages, and the assistant is instructed to say when the documents do not contain the answer." },
  { title: "Data leakage", fix: "Per-user access control is applied at retrieval time, and your documents are not used to train public models." },
  { title: "Stale knowledge", fix: "Re-ingestion pipelines keep the index in sync when documents change, so updates show up in answers immediately." },
  { title: "Unmeasured quality", fix: "An evaluation set tracks retrieval hit rate and answer faithfulness so regressions are caught before users see them." },
];

export default function RagPage() {
  const s = getService("rag-implementation")!;
  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageHero
        eyebrow="Flagship · RAG"
        title="Private-knowledge AI your team can actually trust."
        answer="Retrieval-augmented generation (RAG) gives a language model your own documents to read before it answers. Honeybadger.AI builds the whole pipeline: ingestion, embeddings, vector search, cited answers and guardrails."
      >
        <Breadcrumbs items={[{ name: "RAG & AI", path: "/rag-ai" }]} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact" size="lg">
            Scope a RAG pilot
          </CtaLink>
          <WhatsAppLink size="lg" href={waLink("Hi Honeybadger.AI, I'd like to discuss a RAG chatbot.")} />
        </div>
      </PageHero>

      <section aria-labelledby="define" className="mx-auto max-w-3xl px-5 pb-8">
        <h2 id="define" className="text-h2">What is RAG?</h2>
        <p className="text-lead text-muted-foreground mt-4">
          RAG stands for retrieval-augmented generation. The system first searches your knowledge base for relevant passages, then passes them to a large language model to write an answer with citations.
        </p>
        <p className="text-muted-foreground mt-3">
          Unlike fine-tuning, RAG retrieves information at question time. Update a document and the next answer reflects it. That makes RAG the practical default for support bots, internal copilots, sales assistants and compliance lookups.
        </p>
      </section>

      <RagSpotlight />

      <section aria-labelledby="included" className="mx-auto max-w-6xl px-5 py-16">
        <h2 id="included" className="text-h2 max-w-3xl">What a RAG build includes</h2>
        <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
          A production RAG system is more than a vector database and a prompt. These are the pieces we deliver and maintain.
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

      <section aria-labelledby="risks" className="mx-auto max-w-6xl px-5 py-16">
        <h2 id="risks" className="text-h2 max-w-3xl">The risks, and how we handle them</h2>
        <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
          Most failed AI chatbots fail for the same four reasons. We design against each of them from the start.
        </p>
        <dl className="mt-8 grid gap-4 md:grid-cols-2">
          {RISKS.map((r) => (
            <div key={r.title} className="glass p-6">
              <dt className="font-display text-lg font-semibold">{r.title}</dt>
              <dd className="text-muted-foreground mt-2 text-sm">{r.fix}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="rag-compare" className="mx-auto max-w-6xl px-5 py-16">
        <h2 id="rag-compare" className="text-h2 max-w-3xl">RAG vs. a generic chatbot</h2>
        <p className="text-lead text-muted-foreground mt-4 max-w-2xl">
          A generic chatbot answers from what it memorised during training. A RAG assistant answers from your documents and shows where the answer came from.
        </p>
        <div className="glass mt-8 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">RAG assistant compared with a generic chatbot</caption>
            <thead>
              <tr className="border-border border-b">
                <th scope="col" className="p-4 font-medium">Aspect</th>
                <th scope="col" className="text-brand p-4 font-medium">Our RAG build</th>
                <th scope="col" className="text-muted-foreground p-4 font-medium">Generic chatbot</th>
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

      <Faq id="rag-faq" items={s.faq} title="RAG: common questions" answer="Plain answers on how RAG works and how it differs from other approaches." />
      <FinalCta />
    </>
  );
}

