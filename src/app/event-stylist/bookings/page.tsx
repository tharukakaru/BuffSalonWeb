"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { CalendarDays, Users, MapPin } from "lucide-react";

const bookings = [
  { client: "Jessica & Tom", type: "Wedding", date: "Aug 12", party: 6, location: "The Plaza Hotel", status: "confirmed" },
  { client: "VIP Gala", type: "VIP", date: "Aug 20", party: 4, location: "Downtown Venue", status: "pending" },
];

export default function EventBookingsPage() {
  return (
    <PageLayout title="Bookings" description="Manage wedding and event bookings.">
      <div className="grid gap-3">
        {bookings.map((b, i) => (
          <RowCard
            key={i}
            icon={CalendarDays}
            title={b.client}
            subtitle={`${b.type} · ${b.date}`}
            badge={{ text: b.status, tone: b.status === "confirmed" ? "success" : "gold" }}
            right={
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {b.party}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {b.location}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
