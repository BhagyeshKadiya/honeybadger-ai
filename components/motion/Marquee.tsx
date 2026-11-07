import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Infinite CSS marquee (server component, compositor-only animation). Pauses on hover. */
export function Marquee({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
      role="group"
      aria-label={label}
    >
      <div className="marquee-track flex gap-4">
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

