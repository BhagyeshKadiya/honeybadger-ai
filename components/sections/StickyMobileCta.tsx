import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WA_LINK } from "@/lib/constants";

/** Thumb-friendly sticky bottom CTA, mobile and tablet only. Server-rendered. */
export function StickyMobileCta() {
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 p-3 lg:hidden">
      <div className="glass mx-auto flex max-w-md items-center gap-2 p-2 shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.8)]">
        <Link
          href="/contact"
          className="btn-primary-brand flex h-12 flex-1 items-center justify-center rounded-xl text-sm font-semibold"
        >
          <span className="relative z-10">Start your project</span>
        </Link>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          className="btn-secondary-brand grid size-12 shrink-0 place-items-center rounded-xl"
        >
          <MessageCircle className="text-brand size-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
