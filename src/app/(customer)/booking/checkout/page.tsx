"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, Clock, Scissors, User, Store } from "lucide-react";

type Draft = {
  salon: string;
  services: { name: string; price: number; duration: string }[];
  stylist: string;
};

function readDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem("bookingDraft");
    if (!raw) return null;
    return JSON.parse(raw) as Draft;
  } catch {
    return null;
  }
}

export default function BookingCheckoutPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    const d = readDraft();
    setDraft(d);
    if (!d) toast.info("No booking selected. Please choose services first.");
  }, []);

  const total = useMemo(() => {
    if (!draft) return 0;
    return draft.services.reduce((sum, s) => sum + (s.price || 0), 0);
  }, [draft]);

  const durationText = useMemo(() => {
    if (!draft) return "";
    // Just show combined duration text (simple)
    return draft.services.map((s) => s.duration).join(" • ");
  }, [draft]);

  if (!draft) {
    return (
      <div className="p-5 md:p-8 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            No booking draft found. Go back to <span className="font-medium text-foreground">Explore</span> and select services.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => router.push("/explore")}>Go to Explore</Button>
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 max-w-2xl mx-auto space-y-5 pb-24">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">Checkout</h1>
          <p className="text-xs text-muted-foreground">Confirm your booking details</p>
        </div>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent-gold/10 flex items-center justify-center">
            <Store className="h-5 w-5 text-accent-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{draft.salon}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <User className="h-3 w-3" />
              Stylist: {draft.stylist}
            </p>
            {durationText && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                {durationText}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Selected services
          </p>

          <div className="space-y-2">
            {draft.services.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-[11px] text-muted-foreground">{s.duration}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-accent-gold">
                  LKR {Number(s.price || 0).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 mt-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Total</p>
            <p className="text-sm font-bold text-accent-gold">
              LKR {total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
        <p className="text-xs text-muted-foreground">
          Backend will handle payment + slot selection later. For now we just confirm.
        </p>
        <Button
          className="w-full h-12 bg-gradient-to-r from-accent-gold to-accent-gold/85 text-background font-semibold"
          onClick={() => {
            toast.success("Booking confirmed!");
            router.push("/booking/confirmation");
          }}
        >
          Confirm Booking
        </Button>
        <Button
          variant="outline"
          className="w-full h-11"
          onClick={() => router.push("/explore")}
        >
          Edit selection (Explore)
        </Button>
      </div>
    </div>
  );
}
