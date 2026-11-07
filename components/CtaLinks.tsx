import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WA_LINK } from "@/lib/constants";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
} as const;

type Size = keyof typeof sizes;

/** Primary turquoise CTA link with shimmer sweep & glow shadow `0 0 24px rgba(29,242,226,0.35)`. */
export function CtaLink({
  href,
  children,
  size = "md",
  className,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  size?: Size;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={cn(base, sizes[size], "btn-primary-brand", className)}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
      </span>
    </Link>
  );
}

/** Secondary CTA: transparent, 1px white/15% border, white text, turquoise border on hover. */
export function WhatsAppLink({
  children = "Chat on WhatsApp",
  size = "md",
  className,
  href = WA_LINK,
}: {
  children?: React.ReactNode;
  size?: Size;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], "btn-secondary-brand font-medium", className)}
    >
      <MessageCircle className="text-brand size-4" aria-hidden="true" />
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
