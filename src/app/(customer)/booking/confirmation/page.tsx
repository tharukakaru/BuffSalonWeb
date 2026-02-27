"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CalendarDays, Sparkles } from "lucide-react";

type Draft = {
  salon: string;
  services: { name: string; price: number; duration: string }[];
  stylist: string;
};

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("bookingDraft");
    if (raw) {
      try {
        setDraft(JSON.parse(raw));
      } catch {}
    }
    // Optional: clear it after confirmation
    // window.sessionStorage.removeItem("bookingDraft");
  }, []);

  return (
    <div className="p-5 md:p-8 max-w-2xl mx-auto space-y-5 pb-24">
      <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-3">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-accent-gold/10 flex items-center justify-center">
          <CheckCircle2 className="h-7 w-7 text-accent-gold" />
        </div>
        <h1 className="text-xl font-bold">Booking Confirmed</h1>
        <p className="text-sm text-muted-foreground">
          Your request has been saved. Slot selection + payments will be handled by backend later.
        </p>
      </div>

      {draft && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <p className="text-sm font-semibold">{draft.salon}</p>
          <p className="text-xs text-muted-foreground">Stylist: {draft.stylist}</p>
          <div className="mt-3 space-y-1">
            {draft.services.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-semibold text-accent-gold">
                  LKR {Number(s.price || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-2">
        <Button onClick={() => router.push("/bookings")} className="h-11">
          <CalendarDays className="h-4 w-4 mr-2" /> Go to Bookings
        </Button>
        <Button variant="outline" onClick={() => router.push("/explore")} className="h-11">
          <Sparkles className="h-4 w-4 mr-2" /> Explore more
        </Button>
      </div>
    </div>
  );
}
