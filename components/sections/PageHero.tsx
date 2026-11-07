import { SITE } from "@/lib/constants";

export function PageHero({
  eyebrow,
  title,
  answer,
  children,
  updated = true,
}: {
  eyebrow?: string;
  title: string;
  answer?: string;
  children?: React.ReactNode;
  updated?: boolean;
}) {
  return (
    <header className="noise relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
      </div>
      <div className="mx-auto max-w-6xl px-5">
        {children}
        {eyebrow && <p className="text-eyebrow mt-6 mb-3">{eyebrow}</p>}
        <h1 className="text-display max-w-4xl">
          {title}
        </h1>
        {answer && <p className="text-lead text-muted-foreground mt-5 max-w-2xl">{answer}</p>}
        {updated && (
          <p className="text-muted-foreground mt-5 font-mono text-xs">
            Last updated:{" "}
            <time dateTime={SITE.lastUpdated}>
              {new Date(SITE.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </p>
        )}
      </div>
    </header>
  );
}
