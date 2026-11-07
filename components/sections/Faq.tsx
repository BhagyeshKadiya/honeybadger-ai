import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/content/faq";
import { SectionHeading } from "./SectionHeading";

export function Faq({
  items,
  title = "Questions, answered plainly.",
  answer = "Short, direct answers to what buyers ask us most. If yours is not here, message us on WhatsApp.",
  id = "faq",
}: {
  items: FaqItem[];
  title?: string;
  answer?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-3xl px-5 py-24 sm:py-32">
      <JsonLd data={faqSchema(items)} />
      <SectionHeading id={`${id}-h`} eyebrow="FAQ" title={title} answer={answer} />
      <Accordion className="mt-10 gap-3" multiple={false}>
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`q-${i}`} className="glass border-0! px-5">
            <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[0.95rem] leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

