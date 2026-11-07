export type ServiceIcon =
  | "globe"
  | "layout"
  | "smartphone"
  | "workflow"
  | "database"
  | "rocket"
  | "search";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: ServiceIcon;
  /** One-line value prop used on cards */
  valueProp: string;
  /** Two-sentence direct answer shown under the H2 */
  answer: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Bento span on the home grid (cols on lg) */
  span: "wide" | "tall" | "normal" | "full";
  deliverables: string[];
  stack: string[];
  outcomes: { title: string; body: string }[];
  comparison: { label: string; us: string; typical: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Websites",
    icon: "globe",
    valueProp: "High-performance, SEO-ready Next.js sites that load fast and get found.",
    answer:
      "We build marketing and product websites on Next.js with server rendering, structured data and Core Web Vitals tuned from day one. Every page ships answer-first so Google and AI engines can quote it.",
    metaTitle: "Website Development Company in India | Next.js, SEO-Ready",
    metaDescription:
      "Honeybadger.AI builds fast, SEO-ready Next.js websites with schema, Core Web Vitals tuning and AI-search readiness for businesses in India and worldwide.",
    keywords: ["website development company India", "Next.js development Vapi", "SEO-ready website Silvassa"],
    span: "wide",
    deliverables: [
      "Next.js App Router build with server components",
      "Design system and responsive UI (360px to 1920px)",
      "Technical SEO: schema, sitemap, canonicals, hreflang",
      "Core Web Vitals budget and Lighthouse audit",
      "CMS or MDX content workflow",
      "Analytics, consent and conversion tracking",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Supabase"],
    outcomes: [
      { title: "Fast by default", body: "Server rendering, image optimisation and a strict JS budget keep LCP under 2 seconds." },
      { title: "Crawlable by humans and machines", body: "Clean semantic HTML and JSON-LD give search engines and AI answer engines clear entities to cite." },
      { title: "Easy to change", body: "Typed content and a component library let your team ship copy changes without a developer." },
    ],
    comparison: [
      { label: "Rendering", us: "Server components, streaming", typical: "Client-rendered page builders" },
      { label: "Structured data", us: "Per-page JSON-LD", typical: "Basic plugin defaults" },
      { label: "Performance target", us: "Lighthouse 95+", typical: "Unmeasured" },
      { label: "AI-search readiness", us: "llms.txt, answer-first copy", typical: "Not considered" },
    ],
    faq: [
      { q: "How long does a business website take to build?", a: "A focused marketing site of five to ten pages typically takes three to five weeks, from discovery to launch. Larger sites with custom integrations, CMS workflows or multiple languages take longer. We agree a fixed scope and weekly milestones before starting." },
      { q: "Do you build on WordPress?", a: "We build on Next.js for speed, security and control over structured data. If you already run WordPress, we can migrate content with redirects preserved so existing rankings are protected, or run it headless behind a Next.js front end." },
    ],
  },
  {
    slug: "web-app-development",
    title: "Web App Development",
    shortTitle: "Web Apps",
    icon: "layout",
    valueProp: "SaaS products, dashboards, portals and internal tools built to scale.",
    answer:
      "We design and build custom web applications such as SaaS platforms, customer portals, dashboards and internal tools. Each one is typed end to end, tested and deployed with monitoring so it keeps working as you grow.",
    metaTitle: "Web App Development Company India | SaaS, Dashboards, Portals",
    metaDescription:
      "Custom web app development in Vapi, Silvassa and across India. SaaS, dashboards, portals and internal tools with AI features built in.",
    keywords: ["web app development Vapi", "web app development Silvassa", "SaaS development India"],
    span: "normal",
    deliverables: [
      "Product discovery and technical architecture",
      "Authentication, roles and permissions",
      "Dashboards, reporting and data visualisation",
      "Payments and subscription billing",
      "REST or GraphQL APIs and third-party integrations",
      "CI/CD, monitoring and error tracking",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "AWS"],
    outcomes: [
      { title: "Built around your workflow", body: "We map how your team actually works before designing a single screen." },
      { title: "AI where it helps", body: "Search, summarisation and automation are added where they remove real manual work, not as decoration." },
      { title: "Production-grade", body: "Typed code, automated tests and observability from the first release." },
    ],
    comparison: [
      { label: "Type safety", us: "TypeScript strict, end to end", typical: "Partial or none" },
      { label: "Ownership", us: "You own the code and infra", typical: "Locked to a vendor" },
      { label: "AI features", us: "Native LLM and RAG options", typical: "Bolt-on later" },
      { label: "Handover", us: "Docs and runbooks included", typical: "Ad hoc" },
    ],
    faq: [
      { q: "What kinds of web apps do you build?", a: "We build SaaS products, internal operations tools, customer and vendor portals, analytics dashboards and booking or order systems. If a spreadsheet or a chain of WhatsApp messages currently runs a process in your business, it is usually a good candidate for a web app." },
      { q: "Can you take over an existing codebase?", a: "Yes. We start with a short code and architecture audit covering security, performance and maintainability. Then we propose a plan to stabilise it, add the missing features or migrate it in stages without disrupting your users." },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    icon: "smartphone",
    valueProp: "iOS and Android apps with React Native or Flutter, shipped to both stores.",
    answer:
      "We build cross-platform iOS and Android apps with React Native or Flutter from a single codebase. We handle design, backend, store submission and the analytics needed to grow installs afterwards.",
    metaTitle: "Mobile App Development Company India | iOS & Android",
    metaDescription:
      "React Native and Flutter mobile app development for iOS and Android. Honeybadger.AI takes your app from design to store launch and install growth.",
    keywords: ["mobile app development company India", "React Native developers India", "Flutter app development Gujarat"],
    span: "tall",
    deliverables: [
      "Product and UX design for mobile",
      "React Native or Flutter build for iOS and Android",
      "Backend, push notifications and offline support",
      "App Store and Google Play submission",
      "Crash reporting and product analytics",
      "Deep links and attribution ready for campaigns",
    ],
    stack: ["React Native", "Flutter", "Firebase", "Supabase", "TypeScript"],
    outcomes: [
      { title: "One codebase, two stores", body: "Shared logic cuts build time and keeps iOS and Android behaviour consistent." },
      { title: "Launch-ready", body: "Store listings, privacy labels and review requirements are handled as part of the build." },
      { title: "Built to be discovered", body: "Deep links and attribution are wired in so install campaigns can be measured properly." },
    ],
    comparison: [
      { label: "Platforms", us: "iOS and Android together", typical: "One platform first, other later" },
      { label: "Store submission", us: "Included", typical: "Left to the client" },
      { label: "Attribution", us: "Set up before launch", typical: "Added after problems appear" },
      { label: "Growth plan", us: "ASO and install campaigns", typical: "Not covered" },
    ],
    faq: [
      { q: "React Native or Flutter: which should I choose?", a: "React Native suits teams that already use JavaScript or TypeScript and want to share logic with a Next.js web app. Flutter offers highly consistent custom UI across devices. We recommend one after reviewing your team, timeline and feature needs." },
      { q: "Do you publish the app to the stores?", a: "Yes. We prepare the store listings, screenshots, privacy disclosures and builds, and manage submission and review feedback for both the Apple App Store and Google Play. Accounts stay in your name so you keep full ownership." },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortTitle: "AI Automation",
    icon: "workflow",
    valueProp: "n8n workflows, LLM agents and WhatsApp, CRM and ERP automation.",
    answer:
      "We automate repetitive business processes using n8n workflows and LLM agents connected to your WhatsApp, CRM and ERP. The result is faster response times and fewer manual handoffs, with a human in the loop where it matters.",
    metaTitle: "AI Automation Agency Gujarat & India | n8n, LLM Agents",
    metaDescription:
      "AI automation for WhatsApp, CRM and ERP using n8n and LLM agents. Honeybadger.AI helps Indian businesses cut manual work and respond faster.",
    keywords: ["AI automation agency Gujarat", "n8n automation India", "WhatsApp automation CRM"],
    span: "normal",
    deliverables: [
      "Process mapping and automation opportunity audit",
      "n8n workflows with error handling and retries",
      "LLM agents with tool use and approval steps",
      "WhatsApp Business API flows",
      "CRM and ERP integrations",
      "Logging, cost controls and monitoring",
    ],
    stack: ["n8n", "OpenAI", "Claude", "Python", "WhatsApp Business API"],
    outcomes: [
      { title: "Faster responses", body: "Leads and support queries get an instant, relevant first reply any time of day." },
      { title: "Less copy-paste", body: "Data moves between WhatsApp, your CRM and your ERP without manual re-entry." },
      { title: "Safe by design", body: "Approval steps, rate limits and audit logs keep agents inside clear boundaries." },
    ],
    comparison: [
      { label: "Orchestration", us: "n8n with versioned workflows", typical: "Fragile one-off scripts" },
      { label: "Human oversight", us: "Approval steps on risky actions", typical: "Fully autonomous or none" },
      { label: "Observability", us: "Logs, alerts, cost tracking", typical: "None" },
      { label: "Integration", us: "WhatsApp, CRM, ERP", typical: "Single tool" },
    ],
    faq: [
      { q: "What can AI automation actually handle?", a: "Common wins include lead capture and qualification, WhatsApp order and support replies, invoice and document processing, report generation and syncing data between your CRM and ERP. We start with the process that costs your team the most hours." },
      { q: "Is n8n better than Zapier or Make?", a: "n8n can be self-hosted, which gives you more control over data and predictable costs at higher volume. It also handles complex branching and custom code well. For simple two-step automations, Zapier or Make can be perfectly adequate." },
    ],
  },
  {
    slug: "rag-implementation",
    title: "RAG Implementation",
    shortTitle: "RAG",
    icon: "database",
    valueProp: "Private-knowledge chatbots and copilots with citations and guardrails.",
    answer:
      "Retrieval-augmented generation (RAG) lets an AI assistant answer from your own documents instead of guessing. We build the full pipeline: ingestion, embeddings, a vector database, retrieval, cited answers and guardrails.",
    metaTitle: "RAG Implementation Company India | Private AI Chatbots",
    metaDescription:
      "RAG implementation with vector databases, embeddings, document ingestion, citations and guardrails. Build a private-knowledge AI chatbot or copilot.",
    keywords: ["RAG implementation company", "private knowledge chatbot", "enterprise RAG India"],
    span: "normal",
    deliverables: [
      "Document ingestion for PDF, Word, web and databases",
      "Chunking and embedding strategy",
      "Vector database on pgvector or Pinecone",
      "Hybrid retrieval and re-ranking",
      "Cited answers with source links",
      "Guardrails, access control and evaluation harness",
    ],
    stack: ["pgvector", "Pinecone", "LangChain", "OpenAI", "Claude"],
    outcomes: [
      { title: "Answers grounded in your data", body: "Every response is traced back to the source passage so users can verify it." },
      { title: "Private by design", body: "Documents stay in your infrastructure with per-user access control." },
      { title: "Measured quality", body: "We build an evaluation set so retrieval and answer quality are tracked, not assumed." },
    ],
    comparison: [
      { label: "Answer source", us: "Your documents, cited", typical: "Model memory, uncited" },
      { label: "Hallucination control", us: "Grounding and refusal rules", typical: "Prompt only" },
      { label: "Access control", us: "Per-user permissions", typical: "Shared index" },
      { label: "Evaluation", us: "Test set and metrics", typical: "Manual spot checks" },
    ],
    faq: [
      { q: "What is RAG in simple terms?", a: "RAG stands for retrieval-augmented generation. The system first searches your documents for relevant passages, then gives them to a large language model to write the answer. This keeps responses grounded in your facts and lets the model cite its sources." },
      { q: "How is RAG different from fine-tuning?", a: "Fine-tuning changes a model's behaviour or style, but it is a poor way to teach it changing facts. RAG retrieves current information at question time, so updating a document immediately updates the answers, and every claim can be traced to a source." },
    ],
  },
  {
    slug: "app-download-campaigns",
    title: "App Download Campaigns",
    shortTitle: "App Installs",
    icon: "rocket",
    valueProp: "ASO, Meta and Google UAC install campaigns with proper attribution.",
    answer:
      "We grow app installs through app store optimisation and paid install campaigns on Meta and Google UAC. Deep links and attribution are configured first so you can see which campaign produces retained users, not just installs.",
    metaTitle: "App Install Campaign Agency India | ASO, Meta & Google UAC",
    metaDescription:
      "App download campaigns: ASO, Meta and Google UAC install ads, deep-link and attribution setup and install-to-retention funnels.",
    keywords: ["app install campaign agency", "ASO agency India", "Google UAC campaigns"],
    span: "wide",
    deliverables: [
      "App Store and Google Play listing optimisation (ASO)",
      "Meta and Google UAC campaign structure and creative",
      "Deep links and deferred deep linking",
      "Attribution setup (MMP) and event taxonomy",
      "Install-to-activation and retention funnels",
      "Weekly reporting on cost per retained user",
    ],
    stack: ["Google UAC", "Meta Ads", "Firebase", "AppsFlyer", "Adjust"],
    outcomes: [
      { title: "Installs you can measure", body: "Attribution and event tracking show which campaigns bring users who stay." },
      { title: "Better store conversion", body: "Listing tests improve how many store visitors install." },
      { title: "Retention-first funnels", body: "Onboarding and re-engagement flows turn installs into active users." },
    ],
    comparison: [
      { label: "Success metric", us: "Cost per retained user", typical: "Cost per install" },
      { label: "Attribution", us: "Configured before spend", typical: "Added later or missing" },
      { label: "Store listing", us: "ASO tested and iterated", typical: "Left as is" },
      { label: "Deep links", us: "Deferred deep linking", typical: "Home screen only" },
    ],
    faq: [
      { q: "What is ASO and why does it matter?", a: "App store optimisation improves your app's title, keywords, icon, screenshots and description so more people find it and install it from store search. Strong ASO lowers the cost of every paid install because more store visitors convert." },
      { q: "How much should I budget for install campaigns?", a: "Budget depends on your category, market and target cost per retained user. We usually start with a controlled test budget to learn which creatives and audiences work, then scale only what shows retention. We do not recommend scaling before attribution is verified." },
    ],
  },
  {
    slug: "aeo-geo-seo",
    title: "AEO, GEO and SEO",
    shortTitle: "AEO · GEO · SEO",
    icon: "search",
    valueProp: "Rank in Google and get cited by ChatGPT, Perplexity, Gemini and AI Overviews.",
    answer:
      "Answer engine optimisation (AEO), generative engine optimisation (GEO) and SEO make your brand easy to find and easy to quote. We combine technical SEO, schema, entity building and llms.txt to drive visits to your website and web app.",
    metaTitle: "AEO, GEO & SEO Agency India | Rank in Google and AI Answers",
    metaDescription:
      "AEO, GEO and SEO services to rank in Google and in ChatGPT, Perplexity, Gemini and Google AI Overviews. Schema, entity building and llms.txt.",
    keywords: ["AEO GEO SEO agency India", "generative engine optimization", "AI search optimization"],
    span: "full",
    deliverables: [
      "Technical SEO audit and fixes",
      "Answer-first content architecture",
      "Schema markup: Organization, FAQ, Service, Article",
      "Entity building across the web and knowledge sources",
      "llms.txt and AI crawler access policy",
      "Citation tracking in ChatGPT, Perplexity, Gemini and AI Overviews",
    ],
    stack: ["Search Console", "Schema.org", "Ahrefs", "Perplexity", "Next.js"],
    outcomes: [
      { title: "Visible in classic search", body: "Technical fixes and focused content improve rankings for the queries that bring buyers." },
      { title: "Quoted by AI engines", body: "Concise, structured, well-sourced answers are the content AI systems prefer to cite." },
      { title: "Traffic that converts", body: "We tie visits to leads and signups, not vanity rankings." },
    ],
    comparison: [
      { label: "SEO", us: "Technical + content + links", typical: "Keyword stuffing" },
      { label: "AEO / GEO", us: "Answer-first, schema, entities", typical: "Not offered" },
      { label: "AI crawlers", us: "Explicit policy and llms.txt", typical: "Ignored" },
      { label: "Reporting", us: "Visits, citations, leads", typical: "Rankings only" },
    ],
    faq: [
      { q: "What is the difference between SEO, AEO and GEO?", a: "SEO earns rankings in traditional search results. AEO structures content so answer boxes and assistants can lift a direct answer. GEO increases how often generative engines such as ChatGPT, Perplexity and Gemini mention and cite your brand. They share foundations but need different tactics." },
      { q: "Can you guarantee a ChatGPT or AI Overview citation?", a: "No one can, because these systems are not controllable. We can improve the odds by publishing clear, factual, well-structured answers, building consistent entity signals and allowing AI crawlers. We track citations over time and report honestly on what changes." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
