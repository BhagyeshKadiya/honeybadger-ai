import { PROCESS } from "@/content/home";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        id="process-h"
        eyebrow="Process"
        title="Five steps from first call to compounding growth."
        answer="Every project follows the same five-step path: Discover, Design, Build, Automate, Grow. You get weekly demos and a clear next milestone at every stage."
      />

      <Stagger className="relative mt-14 grid gap-6 lg:grid-cols-5" stagger={0.1}>
        <div aria-hidden="true" className="bg-border absolute top-5 right-[10%] left-[10%] hidden h-px lg:block" />
        {PROCESS.map((p) => (
          <StaggerItem key={p.step}>
            <div className="relative">
                <span className="bg-background text-brand border-border relative z-10 grid size-10 place-items-center rounded-full border font-mono text-sm font-medium shadow-[0_0_0_6px_var(--background)]">
                  {p.step}
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{p.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
