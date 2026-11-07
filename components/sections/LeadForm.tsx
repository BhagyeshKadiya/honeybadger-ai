"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { leadSchema, SERVICE_OPTIONS, type LeadInput } from "@/lib/lead";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

/** `compact` = name, WhatsApp, message. `full` adds email and service. */
export function LeadForm({ variant = "full", className }: { variant?: "compact" | "full"; className?: string }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "", website: "" },
  });

  async function onSubmit(values: LeadInput) {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; delivery?: string; waUrl?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      reset();
      if (data.delivery === "whatsapp" && data.waUrl) {
        toast.success("Almost done: tap send in WhatsApp to deliver your message.");
        window.open(data.waUrl, "_blank", "noopener,noreferrer");
      } else {
        toast.success("Thanks! We will reply within one working day.");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send. Please message us on WhatsApp.");
    }
  }

  const invalid = (k: keyof LeadInput) => (errors[k] ? true : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("space-y-4", className)}>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className={cn("grid gap-4", variant === "full" && "sm:grid-cols-2")}>
        <Field id="name" label="Name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" aria-invalid={invalid("name")} aria-describedby={errors.name ? "name-error" : undefined} className="h-11" {...register("name")} />
        </Field>
        <Field id="phone" label="WhatsApp / phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" aria-invalid={invalid("phone")} aria-describedby={errors.phone ? "phone-error" : undefined} className="h-11" {...register("phone")} />
        </Field>
        {variant === "full" && (
          <>
            <Field id="email" label="Email (optional)" error={errors.email?.message}>
              <Input id="email" type="email" autoComplete="email" aria-invalid={invalid("email")} aria-describedby={errors.email ? "email-error" : undefined} className="h-11" {...register("email")} />
            </Field>
            <Field id="service" label="Service">
              <Controller
                control={control}
                name="service"
                render={({ field }) => (
                  <Select value={field.value || null} onValueChange={(v) => field.onChange(v ?? "")}>
                    <SelectTrigger id="service" className="h-11 w-full">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </>
        )}
      </div>

      <Field id="message" label="What are you building?" error={errors.message?.message}>
        <Textarea id="message" rows={variant === "full" ? 5 : 3} aria-invalid={invalid("message")} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary-brand inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold transition-opacity disabled:opacity-60"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          {isSubmitting ? "Sending…" : "Send message"}
        </span>
      </button>
    </form>
  );
}

