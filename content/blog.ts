/**
 * Blog content. Typed and MDX-ready: to move to MDX later, add `@next/mdx`,
 * place `.mdx` files in `content/blog/`, and swap `POSTS` for a loader that
 * reads frontmatter. The route and schema code will not change.
 */
export interface PostSection {
  h2: string;
  /** Two-sentence direct answer shown directly under the H2 */
  answer: string;
  body?: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  readMinutes: number;
  sections: PostSection[];
}

export const POSTS: Post[] = [
  {
    slug: "what-is-rag-and-when-to-use-it",
    title: "What is RAG, and when should a business use it?",
    description:
      "Retrieval-augmented generation explained for decision makers: how it works, when it beats fine-tuning, and what a production build needs.",
    date: "2026-11-07",
    updated: "2026-11-07",
    readMinutes: 5,
    sections: [
      {
        h2: "What is RAG?",
        answer:
          "Retrieval-augmented generation (RAG) is a pattern where an AI system searches your documents first and then writes an answer using what it found. This keeps responses grounded in your facts and lets the system cite its sources.",
        body: [
          "A basic RAG pipeline has five steps: ingest documents, split them into chunks, convert the chunks to embeddings, store them in a vector database, and retrieve the best matches at question time to give to the language model.",
        ],
      },
      {
        h2: "When is RAG better than fine-tuning?",
        answer:
          "Use RAG when your information changes or must be traceable to a source. Use fine-tuning when you need to change the model's style or behaviour rather than teach it new facts.",
        body: ["Most business use cases, such as support, internal knowledge and sales enablement, are retrieval problems. That is why RAG is usually the first thing to try."],
      },
      {
        h2: "What does a production RAG system need?",
        answer:
          "A production system needs good ingestion, hybrid retrieval, citations, access control and an evaluation set. Without these, a demo that looks impressive will fail on real questions.",
        body: ["Plan for re-ingestion when documents change, refusal behaviour when the answer is not in the documents, and logging so you can see what users actually ask."],
      },
    ],
  },
  {
    slug: "aeo-vs-geo-vs-seo",
    title: "AEO vs GEO vs SEO: what is the difference?",
    description:
      "SEO, answer engine optimisation and generative engine optimisation compared: goals, tactics and how to combine them.",
    date: "2026-11-07",
    updated: "2026-11-07",
    readMinutes: 4,
    sections: [
      {
        h2: "What is the difference between SEO, AEO and GEO?",
        answer:
          "SEO earns rankings in traditional search results, AEO structures content so assistants and answer boxes can quote it, and GEO increases how often generative engines like ChatGPT, Perplexity and Gemini cite your brand. They share foundations but target different surfaces.",
      },
      {
        h2: "What do they have in common?",
        answer:
          "All three reward clear, accurate, well-structured content from a source that is easy to identify. Technical health, schema markup and consistent entity information help every one of them.",
        body: ["Fast pages, semantic HTML, structured data and an answer-first writing style are the shared base."],
      },
      {
        h2: "How should a business combine them?",
        answer:
          "Start with technical SEO and clean entity data, then restructure key pages to answer questions directly, then track citations in AI engines. Treat AI citations as a signal to monitor, not a result anyone can guarantee.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

