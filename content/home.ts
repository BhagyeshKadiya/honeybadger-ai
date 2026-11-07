export const STORY = [
  {
    step: "01",
    verb: "Build",
    title: "We build the product",
    body: "Websites, web apps and mobile apps on a modern, typed stack. Fast, accessible and designed around the job your customer is trying to get done.",
    points: ["Next.js, React Native, Flutter", "Design system and component library", "Core Web Vitals budget from day one"],
  },
  {
    step: "02",
    verb: "Automate",
    title: "AI automates and answers with RAG",
    body: "We connect LLM agents and private-knowledge retrieval to your WhatsApp, CRM and ERP, so routine work runs itself and every answer cites its source.",
    points: ["n8n workflows and LLM agents", "RAG over your documents with citations", "Guardrails and human approval steps"],
  },
  {
    step: "03",
    verb: "Get found",
    title: "We get it found and downloaded",
    body: "AEO, GEO and SEO put you in Google and in ChatGPT, Perplexity and Gemini answers. ASO and install campaigns drive downloads you can measure.",
    points: ["Schema, entities and llms.txt", "Meta and Google UAC install campaigns", "Attribution through to retention"],
  },
] as const;

export const RAG_PIPELINE = [
  { id: "docs", label: "Documents", hint: "PDF, Word, web, DB" },
  { id: "embed", label: "Embeddings", hint: "Chunk and vectorise" },
  { id: "vector", label: "Vector DB", hint: "pgvector / Pinecone" },
  { id: "llm", label: "LLM", hint: "Grounded generation" },
  { id: "answer", label: "Cited answer", hint: "Sources attached" },
] as const;

export const RAG_DEMO = {
  question: "What does the warranty cover on the X200 pump?",
  answer:
    "The X200 pump has a 24-month warranty covering manufacturing defects in the motor and seals. Impeller wear from abrasive fluids is excluded.",
  sources: ["X200-Datasheet.pdf · p.12", "Warranty-Terms-2026.pdf · §4.2"],
};

/** Illustrative only. These are NOT client results. */
export const GROWTH_EXAMPLES = [
  { label: "Organic visits", value: 12400, suffix: "/mo", delta: "+212%", series: [8, 11, 14, 19, 27, 38, 52, 64, 78, 92] },
  { label: "AI-answer citations", value: 186, suffix: "", delta: "+9x", series: [2, 3, 3, 6, 9, 14, 20, 31, 44, 60] },
  { label: "App installs", value: 8900, suffix: "/mo", delta: "+340%", series: [10, 12, 18, 24, 22, 36, 50, 61, 70, 88] },
] as const;

export const TECH_STACK = [
  "Next.js",
  "React Native",
  "Python",
  "LangChain",
  "OpenAI",
  "Claude",
  "Pinecone",
  "pgvector",
  "n8n",
  "Supabase",
  "Vercel",
  "AWS",
  "Firebase",
] as const;

export const PROCESS = [
  { step: "01", title: "Discover", body: "Goals, users, data and constraints. We leave with a scoped plan and a clear definition of done." },
  { step: "02", title: "Design", body: "Flows, UI system and AI behaviour specified and prototyped before any production code." },
  { step: "03", title: "Build", body: "Weekly shippable increments, typed code, automated tests and a preview link every week." },
  { step: "04", title: "Automate", body: "Agents, workflows and RAG wired into your tools, with guardrails and monitoring." },
  { step: "05", title: "Grow", body: "AEO, GEO, SEO and install campaigns, measured against visits, leads and retained users." },
] as const;

export type CaseCategory = "Web" | "App" | "AI" | "Growth";

// TODO: replace with real case studies. These are placeholders, not client work.
export const CASES: { category: CaseCategory; title: string; summary: string; tags: string[] }[] = [
  { category: "Web", title: "Manufacturer website rebuild", summary: "Placeholder: multilingual product catalogue on Next.js with schema for every product.", tags: ["Next.js", "Schema", "SEO"] },
  { category: "Web", title: "Real estate lead portal", summary: "Placeholder: fast listing pages with WhatsApp lead capture and CRM sync.", tags: ["Next.js", "CRM"] },
  { category: "App", title: "Field service mobile app", summary: "Placeholder: offline-first React Native app for technicians with job sync.", tags: ["React Native", "Offline"] },
  { category: "App", title: "Hospitality booking app", summary: "Placeholder: iOS and Android booking flow with deep links and attribution.", tags: ["Flutter", "Deep links"] },
  { category: "AI", title: "Technical-manual copilot", summary: "Placeholder: RAG assistant over product manuals with page-level citations.", tags: ["RAG", "pgvector"] },
  { category: "AI", title: "WhatsApp order desk automation", summary: "Placeholder: n8n and LLM agent that qualifies and routes incoming orders.", tags: ["n8n", "LLM agents"] },
  { category: "Growth", title: "AI-search visibility programme", summary: "Placeholder: entity building and answer-first content to earn AI citations.", tags: ["AEO", "GEO"] },
  { category: "Growth", title: "App install campaign launch", summary: "Placeholder: ASO plus Meta and Google UAC with install-to-retention reporting.", tags: ["ASO", "UAC"] },
];

// TODO: replace with real, permissioned testimonials. Placeholder text only.
export const TESTIMONIALS = [
  { quote: "Placeholder testimonial: replace with a real client quote about shipping speed and communication.", name: "Client name", role: "Role, Company" },
  { quote: "Placeholder testimonial: replace with a real quote about measurable impact from search or automation.", name: "Client name", role: "Role, Company" },
  { quote: "Placeholder testimonial: replace with a real quote about the RAG assistant or app launch.", name: "Client name", role: "Role, Company" },
];

