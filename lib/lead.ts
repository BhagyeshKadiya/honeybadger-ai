import { z } from "zod";
import { SERVICES } from "@/content/services";

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Not sure yet"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]).optional(),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone or WhatsApp number")
    .max(20)
    .regex(/^[+\d][\d\s-]{6,}$/, "Digits, spaces and + only"),
  service: z.string().max(80).optional(),
  message: z.string().trim().min(10, "Tell us a little about the project (10+ characters)").max(1500),
  /** Honeypot: real users never fill this */
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

