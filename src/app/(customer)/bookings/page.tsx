"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Clock,
  MapPin,
  Scissors,
  ChevronRight,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";

type Draft = {
  salon: string;
  services: { name: string; price: number; duration: string }[];
  stylist: string;
};

type Booking = {
  id: string;
  salon: string;
  stylist: string;
  when: string;
  status: "upcoming" | "completed" | "cancelled";
  address: string;
  services: { name: string; price: number; duration: string }[];
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

export default function BookingsPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setDraft(readDraft());
  }, []);

  // Frontend-only demo bookings
  const bookings: Booking[] = useMemo(() => {
    const base: Booking[] = [
      {
        id: "b1",
        salon: "Velvet Salon & Spa",
        stylist: "Lena M.",
        when: "Tomorrow • 3:30 PM",
        status: "upcoming",
        address: "88 Havelock Road, Colombo 05",
        services: [
          { name: "Luxury Cut & Style", price: 4000, duration: "60 min" },
        ],
      },
      {
        id: "b2",
        salon: "The Curl Bar",
        stylist: "Jade T.",
        when: "Last week • 5:00 PM",
        status: "completed",
        address: "15 Duplication Road, Colombo 04",
        services: [{ name: "Natural Styling", price: 1500, duration: "40 min" }],
      },
    ];

    // If user has draft from Explore/Checkout, show it as top upcoming booking
    if (draft && draft.services?.length) {
      base.unshift({
        id: "draft",
        salon: draft.salon,
        stylist: draft.stylist,
        when: "Requested • Pending slot confirmation",
        status: "upcoming",
        address: "Address will appear after confirmation",
        services: draft.services,
      });
    }

    return base;
  }, [draft]);

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const completed = bookings.filter((b) => b.status === "completed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your appointments and requests.
          </p>
        </div>

        <Button
          className="h-10"
          onClick={() => {
            router.push("/explore");
            toast("Explore salons to book");
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" /> New booking
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="w-full bg-secondary rounded-lg h-10">
          <TabsTrigger
            value="upcoming"
            className="flex-1 rounded-md text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Upcoming ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 rounded-md text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Completed ({completed.length})
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="flex-1 rounded-md text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Cancelled ({cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingList
            items={upcoming}
            onOpen={(id) => {
              if (id === "draft") {
                router.push("/booking/checkout");
              } else {
                toast.info("Booking details page will be added later");
              }
            }}
          />
        </TabsContent>

        <TabsContent value="completed">
          <BookingList
            items={completed}
            onOpen={() => toast.info("Booking details page will be added later")}
          />
        </TabsContent>

        <TabsContent value="cancelled">
          <BookingList
            items={cancelled}
            onOpen={() => toast.info("Booking details page will be added later")}
            emptyText="No cancelled bookings."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookingList({
  items,
  onOpen,
  emptyText = "No bookings here yet.",
}: {
  items: Booking[];
  onOpen: (id: string) => void;
  emptyText?: string;
}) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((b) => (
        <button
          key={b.id}
          onClick={() => onOpen(b.id)}
          className="text-left rounded-2xl border border-border bg-card p-4 hover:border-accent-gold/30 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{b.salon}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <BadgeCheck className="h-3.5 w-3.5 text-accent-gold" />
                <span className="truncate">{b.stylist}</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>

          <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{b.when}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{b.address}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {b.services.slice(0, 3).map((s) => (
              <span
                key={s.name}
                className="px-2 py-0.5 rounded-md bg-accent-gold/10 text-accent-gold text-[10px] font-medium inline-flex items-center gap-1"
              >
                <Scissors className="h-3 w-3" />
                {s.name}
              </span>
            ))}
            {b.services.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-secondary text-[10px] text-muted-foreground font-medium">
                +{b.services.length - 3} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <StatusPill status={b.status} />
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Tap for details
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: Booking["status"] }) {
  if (status === "upcoming") {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-accent-gold/15 text-accent-gold">
        Upcoming
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-secondary text-foreground">
        Completed
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-destructive/10 text-destructive">
      Cancelled
    </span>
  );
}
