import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { LeadForm } from "@/components/sections/LeadForm";
import { WhatsAppLink } from "@/components/CtaLinks";
import { CONTACT } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Honeybadger.AI",
  description:
    "Start your project with Honeybadger.AI. WhatsApp +91 90231 00608 or send a message. HQ: Naroli, Dadra and Nagar Haveli – 396 230.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        answer="The fastest way to reach us is WhatsApp. You can also send the form below and we will reply within one working day with next steps."
        updated={false}
      >
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="glass flex items-start gap-4 p-5">
            <Phone className="text-brand mt-0.5 size-5" aria-hidden="true" />
            <div>
              <h2 className="font-display font-semibold">WhatsApp and phone</h2>
              <a href={`tel:${CONTACT.phoneE164}`} className="text-muted-foreground mt-1 block text-sm hover:underline">
                {CONTACT.phoneDisplay}
              </a>
              <WhatsAppLink className="mt-3">Chat on WhatsApp</WhatsAppLink>
            </div>
          </div>
          <div className="glass flex items-start gap-4 p-5">
            <MapPin className="text-brand mt-0.5 size-5" aria-hidden="true" />
            <div>
              <h2 className="font-display font-semibold">Headquarters</h2>
              <address className="text-muted-foreground mt-1 text-sm not-italic">{CONTACT.address.display}</address>
            </div>
          </div>
          <div className="glass flex items-start gap-4 p-5">
            <Clock className="text-brand mt-0.5 size-5" aria-hidden="true" />
            <div>
              <h2 className="font-display font-semibold">Response time</h2>
              <p className="text-muted-foreground mt-1 text-sm">We reply within one working day, usually sooner on WhatsApp.</p>
            </div>
          </div>
        </div>
        <div className="glass p-6 sm:p-8">
          <h2 className="font-display mb-5 text-xl font-semibold">Send a message</h2>
          <LeadForm variant="full" />
        </div>
      </section>
    </>
  );
}

