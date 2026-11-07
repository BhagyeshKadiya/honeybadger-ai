import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SERVICES } from "@/content/services";
import { CONTACT, NAV_LINKS, SERVING_AREAS, SITE, SOCIAL_LINKS, WA_LINK } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          {/* Uploaded symbol + wordmark lockup */}
          <Link href="/" aria-label={`${SITE.name} home`} className="inline-flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-surface-2 p-1.5 shadow-[0_0_20px_rgba(29,242,226,0.22)]">
              <Image
                src="/brand/symbol.png"
                alt={`${SITE.name} symbol`}
                width={64}
                height={64}
                className="size-7 object-contain drop-shadow-[0_0_8px_rgba(29,242,226,0.45)]"
              />
            </span>
            <span className="wordmark-text text-sm font-semibold tracking-[0.22em]">
              HONEYB<span className="text-brand">&#923;</span>DGER.<span className="text-brand">&#923;</span>I
            </span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-xs text-sm">
            We build AI-powered software. Then we make sure it gets found. Relentless by design, like the badger.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw text-foreground mt-5 inline-flex items-center gap-2 text-sm font-medium"
          >
            <MessageCircle className="text-brand size-4" aria-hidden="true" />
            WhatsApp {CONTACT.phoneDisplay}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="font-display text-sm font-semibold">Services</h2>
          <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="link-draw hover:text-foreground transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <h2 className="font-display text-sm font-semibold">Company</h2>
          <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
            {[
              { label: "RAG & AI", href: "/rag-ai" },
              ...NAV_LINKS,
              { label: "Contact", href: "/contact" },
              { label: "Design System", href: "/design-system" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-draw hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-display text-sm font-semibold">Headquarters</h2>
          <address className="text-muted-foreground mt-4 text-sm not-italic">{CONTACT.address.display}</address>
          <h2 className="font-display mt-6 text-sm font-semibold">Serving</h2>
          <p className="text-muted-foreground mt-2 text-sm">{SERVING_AREAS.join(" · ")}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 text-xs sm:flex-row sm:items-center">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <ul className="flex gap-4">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-foreground transition-colors">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
