import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppLink } from "@/components/CtaLinks";
import { LeadForm } from "./LeadForm";
import { CONTACT } from "@/lib/constants";

export function FinalCta() {
  return (
    <section id="start" aria-labelledby="cta-h" className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
      <Reveal>
        <div className="noise relative isolate overflow-hidden rounded-[2rem] border border-border p-8 sm:p-12 lg:p-16">
          <div aria-hidden="true" className="bg-honey-gradient absolute inset-0 -z-10 opacity-[0.14]" />
          <div aria-hidden="true" className="mesh-blob -top-20 -right-20 -z-10 h-80 w-80" style={{ background: "var(--glow-b)" }} />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 id="cta-h" className="text-h2">
                Let&rsquo;s build something your competitors can&rsquo;t copy.
              </h2>
              <p className="text-lead text-muted-foreground mt-4 max-w-md">
                Tell us what you are building. You will get a straight answer on scope, timeline and whether AI is the right tool, usually within one working day.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <WhatsAppLink size="lg">WhatsApp {CONTACT.phoneDisplay}</WhatsAppLink>
              </div>
            </div>
            <div className="glass p-5 sm:p-6">
              <LeadForm variant="compact" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

