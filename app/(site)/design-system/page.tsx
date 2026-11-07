import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionDivider } from "@/components/motion/SectionDivider";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { BadgerMark } from "@/components/brand/BadgerMark";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildMetadata } from "@/lib/seo";
import { NATIVEWIND_COLORS } from "@/lib/nativewind-theme";

export const metadata: Metadata = buildMetadata({
  title: "Design System & Brand Guidelines",
  description:
    "Honeybadger.AI design system: electric turquoise (#1DF2E2) on pure black (#000000), Montserrat + Inter + JetBrains Mono typography, WCAG 2.2 AA contrast audit, and shadcn/ui + NativeWind tokens.",
  path: "/design-system",
  noIndex: true,
});

const DARK_SWATCHES = [
  { name: "Background", token: "--color-background", value: "#000000", note: "Pure black base" },
  { name: "Surface", token: "--color-surface", value: "#08090A", note: "Cards & panels" },
  { name: "Surface 2", token: "--color-surface-2", value: "#0F1113", note: "Raised & hover" },
  { name: "Primary (Turquoise)", token: "--color-primary", value: "#1DF2E2", note: "Brand accent (<10% screen)" },
  { name: "Primary Hover", token: "--color-primary-hover", value: "#5CF7EC", note: "Hover highlight" },
  { name: "Primary Deep", token: "--color-primary-deep", value: "#0FB8AA", note: "Gradient end" },
  { name: "Primary Foreground", token: "--color-primary-foreground", value: "#001413", note: "Text on turquoise CTAs" },
  { name: "Foreground", token: "--color-foreground", value: "#FFFFFF", note: "Primary headings & copy" },
  { name: "Muted", token: "--color-muted-foreground", value: "#9AA4A6", note: "Secondary body copy" },
  { name: "Subtle", token: "--color-subtle", value: "#5C6668", note: "Decorative / non-essential" },
  { name: "Border", token: "--color-border", value: "rgba(255,255,255,0.08)", note: "1px subtle card border" },
  { name: "Border Strong", token: "--color-border-strong", value: "rgba(29,242,226,0.35)", note: "Turquoise active/hover border" },
];

const SEMANTIC_SWATCHES = [
  { name: "Success", token: "--color-success", value: "#34D399" },
  { name: "Warning", token: "--color-warning", value: "#FBBF24" },
  { name: "Danger", token: "--color-danger", value: "#F87171" },
  { name: "Info (= Primary)", token: "--color-info", value: "#1DF2E2" },
];

const TYPE_SCALE = [
  { label: "4.5rem (72px)", rem: "4.5rem", sample: "HONEYBΛDGER.ΛI", family: "font-display font-semibold tracking-[-0.02em]" },
  { label: "3rem (48px)", rem: "3rem", sample: "Build. Automate. Get found.", family: "font-display font-semibold tracking-[-0.02em]" },
  { label: "2rem (32px)", rem: "2rem", sample: "Private-knowledge AI copilots", family: "font-display font-semibold tracking-[-0.02em]" },
  { label: "1.5rem (24px)", rem: "1.5rem", sample: "Retrieval-augmented generation with citations", family: "font-display font-medium" },
  { label: "1.25rem (20px)", rem: "1.25rem", sample: "Server-rendered Next.js applications tuned for Core Web Vitals.", family: "font-sans" },
  { label: "1.125rem (18px)", rem: "1.125rem", sample: "Body lead copy in Inter (400/500), line-height 1.65, capped at 65ch.", family: "font-sans" },
  { label: "1rem (16px)", rem: "1rem", sample: "Standard body copy in Inter. Clean, high-contrast and effortless to scan.", family: "font-sans" },
  { label: "0.875rem (14px)", rem: "0.875rem", sample: "UI metadata, table cells and secondary descriptions.", family: "font-sans text-muted-foreground" },
  { label: "0.75rem (12px)", rem: "0.75rem", sample: "SECTION EYEBROW · MONTSERRAT 600 · TRACKING 0.2EM", family: "font-display font-semibold tracking-[0.2em] uppercase text-brand" },
];

const CONTRAST_PAIRS = [
  { pair: "White (#FFFFFF) on Pure Black (#000000)", fg: "#FFFFFF", bg: "#000000", ratio: "21.00 : 1", level: "AAA / AA", usage: "Headings & primary body text (dark)" },
  { pair: "White (#FFFFFF) on Surface (#08090A)", fg: "#FFFFFF", bg: "#08090A", ratio: "19.92 : 1", level: "AAA / AA", usage: "Card titles & primary copy" },
  { pair: "Turquoise (#1DF2E2) on Pure Black (#000000)", fg: "#1DF2E2", bg: "#000000", ratio: "14.62 : 1", level: "AAA / AA", usage: "Links, eyebrows, counters, active icons" },
  { pair: "Turquoise (#1DF2E2) on Surface (#08090A)", fg: "#1DF2E2", bg: "#08090A", ratio: "13.87 : 1", level: "AAA / AA", usage: "Card accents, badges & code highlights" },
  { pair: "Primary Foreground (#001413) on Turquoise (#1DF2E2)", fg: "#001413", bg: "#1DF2E2", ratio: "13.68 : 1", level: "AAA / AA", usage: "Primary CTA button text" },
  { pair: "Primary Foreground (#001413) on Primary Deep (#0FB8AA)", fg: "#001413", bg: "#0FB8AA", ratio: "8.12 : 1", level: "AAA / AA", usage: "Primary gradient CTA button text" },
  { pair: "Muted (#9AA4A6) on Pure Black (#000000)", fg: "#9AA4A6", bg: "#000000", ratio: "8.18 : 1", level: "AAA / AA", usage: "Secondary body text (dark)" },
  { pair: "Muted (#9AA4A6) on Surface (#08090A)", fg: "#9AA4A6", bg: "#08090A", ratio: "7.76 : 1", level: "AAA / AA", usage: "Card descriptions & muted labels" },
  { pair: "Foreground (#05100F) on Light Bg (#F7FBFB)", fg: "#05100F", bg: "#F7FBFB", ratio: "18.35 : 1", level: "AAA / AA", usage: "Light theme headings & body copy" },
  { pair: "Light Muted (#3D4E50) on Light Surface (#FFFFFF)", fg: "#3D4E50", bg: "#FFFFFF", ratio: "8.61 : 1", level: "AAA / AA", usage: "Light theme secondary body copy" },
  { pair: "Light Brand Text (#07756C) on Light Surface (#FFFFFF)", fg: "#07756C", bg: "#FFFFFF", ratio: "5.46 : 1", level: "AA (≥16px enforced)", usage: "Light theme turquoise text & eyebrows" },
  { pair: "Primary Foreground (#001413) on Light Primary (#0A9E92)", fg: "#001413", bg: "#0A9E92", ratio: "5.94 : 1", level: "AA", usage: "Light theme primary button text" },
];

export default function DesignSystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Design System · v2.0"
        title="Neon turquoise on pure black. Precision-engineered."
        answer="Every token, font, gradient and motion primitive on Honeybadger.AI is derived directly from our angular badger mark and geometric wordmark."
      >
        <Breadcrumbs items={[{ name: "Design System", path: "/design-system" }]} />
      </PageHero>

      <div className="mx-auto max-w-6xl space-y-24 px-5 pb-28">
        {/* 1. LOGO & MARK VARIANTS */}
        <section aria-labelledby="ds-logo">
          <SectionHeading
            id="ds-logo"
            eyebrow="01 · Brand Mark & Wordmark"
            title="Logo variants and stroke-draw animation."
            answer="The horizontal logo runs at 32–36px in the navbar and footer. The standalone angular badger mark (/brand/mark.svg) powers the favicon, PWA icons, loader and 404 page."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <SpotlightCard className="flex flex-col items-center justify-between gap-6 p-8">
              <BadgerMark size={76} animate />
              <div className="text-center">
                <p className="font-display font-semibold">Animated Badger Mark</p>
                <p className="text-muted-foreground mt-1 font-mono text-xs">/brand/mark.svg · pathLength 0→1 (1.2s)</p>
              </div>
            </SpotlightCard>

            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#000000] p-8">
              <div className="flex flex-1 items-center">
                <Image src="/logo.png" alt="Honeybadger.AI dark logo" width={1024} height={341} style={{ width: "auto", height: "36px" }} />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-white">Dark Theme Lockup (Default)</p>
                <p className="mt-1 font-mono text-xs text-[#9AA4A6]">/logo.png · #1DF2E2 on #000000</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-black/10 bg-[#F7FBFB] p-8">
              <div className="flex flex-1 items-center">
                <Image src="/brand/logo-light.svg" alt="Honeybadger.AI light logo" width={240} height={36} style={{ width: "auto", height: "36px" }} />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-[#05100F]">Light Theme Lockup</p>
                <p className="mt-1 font-mono text-xs text-[#3D4E50]">/brand/logo-light.svg · #05100F &amp; #0A9E92</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider className="px-0" />

        {/* 2. COLOR PALETTE */}
        <section aria-labelledby="ds-colors">
          <SectionHeading
            id="ds-colors"
            eyebrow="02 · Color System"
            title="Pure black, crisp white, electric turquoise."
            answer="Turquoise (#1DF2E2) is the sole brand accent and is kept under 10% of any viewport so black and white dominate with maximum contrast."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DARK_SWATCHES.map((s) => (
              <div key={s.token} className="glass flex flex-col justify-between p-4">
                <div
                  className="h-16 w-full rounded-xl border border-white/10"
                  style={{ background: s.value }}
                />
                <div className="mt-4">
                  <p className="font-display font-semibold">{s.name}</p>
                  <p className="text-brand mt-0.5 font-mono text-xs">{s.value}</p>
                  <p className="text-muted-foreground mt-0.5 font-mono text-[11px]">{s.token}</p>
                  <p className="text-muted-foreground mt-2 text-xs">{s.note}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-display mt-10 text-lg font-semibold">Semantic Status Tokens</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            {SEMANTIC_SWATCHES.map((s) => (
              <div key={s.token} className="glass flex items-center gap-3.5 p-4">
                <span className="size-8 shrink-0 rounded-lg border border-white/10" style={{ background: s.value }} />
                <div>
                  <p className="font-display text-sm font-semibold">{s.name}</p>
                  <p className="text-muted-foreground font-mono text-xs">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider className="px-0" />

        {/* 3. TYPOGRAPHY */}
        <section aria-labelledby="ds-type">
          <SectionHeading
            id="ds-type"
            eyebrow="03 · Typography"
            title="Montserrat, Inter and JetBrains Mono."
            answer="Three self-hosted Google fonts via next/font with display: swap. Montserrat mirrors the geometric wordmark, Inter handles body copy at 65ch max width, and JetBrains Mono powers counters, tags and code."
          />
          <div className="glass mt-10 divide-y divide-border p-6">
            {TYPE_SCALE.map((t) => (
              <div key={t.label} className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0 md:flex-row md:items-baseline md:justify-between">
                <span className="text-brand shrink-0 font-mono text-xs md:w-44">{t.label}</span>
                <p className={t.family} style={{ fontSize: t.rem, lineHeight: 1.15 }}>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider className="px-0" />

        {/* 4. COMPONENTS & MOTION */}
        <section aria-labelledby="ds-components">
          <SectionHeading
            id="ds-components"
            eyebrow="04 · Components & Motion"
            title="Buttons, cards, badges, inputs and tabs."
            answer="Primary buttons sweep a turquoise shimmer on hover and intensify their glow. Links draw a left-to-right turquoise underline. Cards illuminate with a cursor-follow radial spotlight."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Button &amp; Link Variants</CardTitle>
                <CardDescription>Turquoise primary fill (#1DF2E2), 1px white/15% secondary, and muted ghost.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button size="lg">Primary Shimmer CTA</Button>
                <Button variant="secondary" size="lg">Secondary Border</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="destructive" size="sm">Danger</Button>
                <Link href="/contact" className="link-draw text-brand text-sm font-medium">
                  Animated underline link →
                </Link>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Badge>Default Turquoise</Badge>
                <Badge variant="secondary">Surface 2</Badge>
                <Badge variant="outline">Border Strong</Badge>
                <Badge variant="destructive">Danger</Badge>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inputs, Tabs &amp; Scanning Line</CardTitle>
                <CardDescription>Turquoise focus ring (#1DF2E2) and 3s reduced-motion-safe scanning pulse.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Focus me for #1DF2E2 ring..." aria-label="Sample input" />
                <Tabs defaultValue="rag">
                  <TabsList>
                    <TabsTrigger value="rag">RAG Pipeline</TabsTrigger>
                    <TabsTrigger value="aeo">AEO / GEO</TabsTrigger>
                    <TabsTrigger value="apps">Apps</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rag" className="text-muted-foreground pt-2 font-mono text-xs">
                    pgvector · embeddings · hybrid retrieval · citations
                  </TabsContent>
                  <TabsContent value="aeo" className="text-muted-foreground pt-2 font-mono text-xs">
                    Schema.org · llms.txt · answer-first copy
                  </TabsContent>
                  <TabsContent value="apps" className="text-muted-foreground pt-2 font-mono text-xs">
                    Next.js · React Native · Flutter
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionDivider className="px-0" />

        {/* 5. WCAG 2.2 AA CONTRAST REPORT */}
        <section aria-labelledby="ds-contrast">
          <SectionHeading
            id="ds-contrast"
            eyebrow="05 · Accessibility Audit"
            title="WCAG 2.2 AA contrast report."
            answer="Every foreground/background pair is verified against WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text and UI components). On light backgrounds, turquoise text uses #07756C and is never rendered below 16px."
          />
          <div className="glass mt-10 overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <caption className="sr-only">WCAG 2.2 AA contrast ratios for Honeybadger.AI color pairs</caption>
              <thead>
                <tr className="border-border border-b">
                  <th scope="col" className="p-4 font-display font-semibold">Pair</th>
                  <th scope="col" className="p-4 font-display font-semibold">Preview</th>
                  <th scope="col" className="p-4 font-display font-semibold">Contrast Ratio</th>
                  <th scope="col" className="p-4 font-display font-semibold">Grade</th>
                  <th scope="col" className="p-4 font-display font-semibold">Usage</th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST_PAIRS.map((c) => (
                  <tr key={c.pair} className="border-border border-b last:border-0">
                    <th scope="row" className="p-4 font-medium">{c.pair}</th>
                    <td className="p-4">
                      <span
                        className="inline-block rounded-md border border-white/10 px-3 py-1 font-mono text-xs font-semibold"
                        style={{ color: c.fg, background: c.bg }}
                      >
                        Aa 123
                      </span>
                    </td>
                    <td className="text-brand p-4 font-mono">{c.ratio}</td>
                    <td className="p-4">
                      <Badge variant="outline">{c.level}</Badge>
                    </td>
                    <td className="text-muted-foreground p-4">{c.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <SectionDivider className="px-0" />

        {/* 6. EXPO / NATIVEWIND SYNC */}
        <section aria-labelledby="ds-expo">
          <SectionHeading
            id="ds-expo"
            eyebrow="06 · Mobile Sync"
            title="Expo + NativeWind shared tokens."
            answer="Exported from lib/nativewind-theme.ts so React Native apps share the exact #1DF2E2 primary, #000000 background, #08090A surface, font names and Skia glow constants."
          />
          <pre className="glass mt-8 overflow-x-auto p-6 font-mono text-xs leading-relaxed">
            <code>{JSON.stringify(NATIVEWIND_COLORS, null, 2)}</code>
          </pre>
        </section>
      </div>
    </>
  );
}

