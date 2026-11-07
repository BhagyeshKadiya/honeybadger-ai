import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Section header with an answer-first structure:
 * Eyebrow (Montserrat, 600, tracking 0.2em, turquoise) -> H2 -> 2-sentence direct answer.
 */
export function SectionHeading({
  eyebrow,
  title,
  answer,
  align = "left",
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  answer?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="text-eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-h2">
        {title}
      </h2>
      {answer && <p className="text-lead text-muted-foreground mt-4">{answer}</p>}
    </Reveal>
  );
}
