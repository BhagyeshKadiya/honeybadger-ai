import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt3DCard } from "@/components/motion/Tilt3DCard";
import { GROWTH_EXAMPLES } from "@/content/home";
import { SectionHeading } from "./SectionHeading";
import { TrendingUp } from "lucide-react";

function Sparkline({ series, id }: { series: readonly number[]; id: string }) {
  const max = Math.max(...series);
  const pts = series.map((v, i) => `${(i / (series.length - 1)) * 200},${68 - (v / max) * 60}`);
  const line = `M${pts.join(" L")}`;
  return (
    <svg viewBox="0 0 200 70" className="depth-z-10 mt-5 h-18 w-full sm:mt-6 sm:h-20" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-s`} x1="0" x2="1">
          <stop offset="0" stopColor="#1DF2E2" />
          <stop offset="1" stopColor="#0FB8AA" />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1DF2E2" stopOpacity="0.25" />
          <stop offset="1" stopColor="#1DF2E2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L200,70 L0,70Z`} fill={`url(#${id}-f)`} />
      <path d={line} stroke={`url(#${id}-s)`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="[stroke-dasharray:1] [stroke-dashoffset:0]" />
    </svg>
  );
}

export function Growth() {
  return (
    <section id="growth" aria-labelledby="growth-h" className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-28">
      <SectionHeading
        id="growth-h"
        eyebrow="Ranking and growth"
        title="What getting found looks like."
        answer="A product only grows when people can discover it. These example curves show the kind of trajectory a combined SEO, AEO, GEO and install strategy aims for."
      />

      <p className="text-muted-foreground mt-6 mb-2 font-mono text-[11px] uppercase tracking-wider md:hidden">
        Swipe telemetry cards →
      </p>

      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-2 sm:mt-12 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {GROWTH_EXAMPLES.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.08} className="w-[82vw] max-w-[310px] shrink-0 snap-center md:w-auto md:max-w-none">
            <Tilt3DCard className="h-full p-5 sm:p-6">
              <div className="depth-z-10 text-muted-foreground flex items-center justify-between text-sm">
                <span className="font-display font-medium text-foreground">{g.label}</span>
                <span className="text-brand flex items-center gap-1 font-mono text-xs font-medium">
                  <TrendingUp className="size-3.5" aria-hidden="true" /> {g.delta}
                </span>
              </div>
              <p className="depth-z-20 text-brand mt-3 font-mono text-3xl font-medium tracking-tight drop-shadow-[0_0_16px_rgba(29,242,226,0.25)] sm:text-4xl">
                <Counter to={g.value} suffix={g.suffix} />
              </p>
              <Sparkline series={g.series} id={`g${i}`} />
            </Tilt3DCard>
          </Reveal>
        ))}
      </div>

      <p className="text-muted-foreground mt-4 max-w-2xl text-xs sm:mt-6">
        Illustrative examples only. These figures are not client results and do not represent guaranteed outcomes.
      </p>
    </section>
  );
}
