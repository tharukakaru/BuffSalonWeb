"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { CalendarDays, Clock } from "lucide-react";

const bookings = [
  { id: "B-1203", client: "Emma Johnson", service: "Haircut", time: "10:00 AM", status: "confirmed" },
  { id: "B-1204", client: "Sophia Lee", service: "Color", time: "12:30 PM", status: "pending" },
  { id: "B-1205", client: "Olivia Brown", service: "Bridal", time: "3:00 PM", status: "confirmed" },
];

export default function AdminBookingsPage() {
  return (
    <PageLayout title="Bookings" description="Monitor bookings across salons and stylists.">
      <div className="grid gap-3">
        {bookings.map((b) => (
          <RowCard
            key={b.id}
            icon={CalendarDays}
            title={`${b.id} · ${b.client}`}
            subtitle={b.service}
            badge={{
              text: b.status,
              tone: b.status === "confirmed" ? "success" : "gold",
            }}
            right={
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {b.time}
              </span>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
