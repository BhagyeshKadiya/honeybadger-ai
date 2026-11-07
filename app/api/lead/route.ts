import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";
import { CONTACT, waLink } from "@/lib/constants";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (per server instance). Use a shared store in production.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const lead = parsed.data;

  // Honeypot tripped: pretend success, drop silently
  if (lead.website) return NextResponse.json({ ok: true, delivery: "dropped" });

  const text = [
    "New Honeybadger.AI lead",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.service ? `Service: ${lead.service}` : null,
    `Message: ${lead.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  // 1) Webhook (e.g. an n8n workflow that pushes to WhatsApp / CRM)
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, text, source: "honeybadgerai.in" }),
      });
      if (res.ok) return NextResponse.json({ ok: true, delivery: "webhook" });
      console.error("Lead webhook failed", res.status);
    } catch (e) {
      console.error("Lead webhook error", e);
    }
  }

  // 2) Email via Resend
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO ?? CONTACT.email;
  if (key) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM ?? "Honeybadger.AI <leads@honeybadgerai.in>",
          to: [to],
          reply_to: lead.email || undefined,
          subject: `New lead: ${lead.name}`,
          text,
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, delivery: "email" });
      console.error("Lead email failed", res.status);
    } catch (e) {
      console.error("Lead email error", e);
    }
  }

  // 3) Fallback: hand the lead to WhatsApp (client opens this link)
  return NextResponse.json({ ok: true, delivery: "whatsapp", waUrl: waLink(text) });
}

