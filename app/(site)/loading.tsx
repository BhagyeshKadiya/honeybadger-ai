import { BadgerMark } from "@/components/brand/BadgerMark";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <BadgerMark size={56} animate />
      <span className="wordmark-text text-muted-foreground text-xs">HONEYBADGER.AI</span>
    </div>
  );
}
