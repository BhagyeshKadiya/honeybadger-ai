import Link from "next/link";
import { CtaLink } from "@/components/CtaLinks";
import { BadgerMark } from "@/components/brand/BadgerMark";

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div aria-hidden="true" className="bg-hero-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <BadgerMark size={72} animate className="mb-6" />
      <p className="text-brand-gradient font-display text-7xl font-bold tracking-tight sm:text-8xl">404</p>
      <h1 className="text-h2 mt-4">This page went digging and never came back.</h1>
      <p className="text-lead text-muted-foreground mt-3 max-w-md">
        The honey badger is relentless, but this URL does not exist. Head home or pick a service.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CtaLink href="/">Back to home</CtaLink>
        <Link href="/services" className="btn-secondary-brand inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium">
          View services
        </Link>
      </div>
    </main>
  );
}
