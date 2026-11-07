import { Marquee } from "@/components/motion/Marquee";
import { TECH_STACK } from "@/content/home";

export function TechStack() {
  return (
    <section aria-labelledby="tech-h" className="border-border border-y py-14">
      <h2 id="tech-h" className="text-eyebrow mb-8 text-center">
        The stack we ship with
      </h2>
      <Marquee label="Technologies we use">
        {TECH_STACK.map((t) => (
          <span key={t} className="glass shrink-0 px-6 py-3 font-mono text-sm font-medium tracking-tight">
            {t}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
