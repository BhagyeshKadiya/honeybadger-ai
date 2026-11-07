import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** Visible breadcrumb + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i < all.length - 1 ? (
              <>
                <Link href={c.path} className="hover:text-foreground transition-colors">
                  {c.name}
                </Link>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </>
            ) : (
              <span aria-current="page" className="text-foreground">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

