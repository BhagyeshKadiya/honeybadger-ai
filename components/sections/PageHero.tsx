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
    <header className="noise relative isolate overflow-hidden pt-24 pb-10 sm:pt-36 sm:pb-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
        <div className="bg-perspective-grid-3d pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-60" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        {eyebrow && (
          <p className="text-eyebrow mb-2.5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-[11px] sm:mb-3 sm:text-xs">
            <span className="animate-turquoise-pulse bg-primary size-1.5 rounded-full" />
            {eyebrow}
          </p>
        )}
        <h1 className="text-display max-w-4xl text-balance">
          {title}
        </h1>
        {answer && <p className="text-lead text-muted-foreground mt-4 max-w-2xl sm:mt-5">{answer}</p>}
        {children && <div className="mt-5 sm:mt-6">{children}</div>}
        {updated && (
          <p className="text-muted-foreground mt-5 font-mono text-[11px] sm:text-xs">
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
