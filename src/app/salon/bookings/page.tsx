"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { CalendarDays, Clock, User } from "lucide-react";

const bookings = [
  { client: "Emma Johnson", service: "Haircut", date: "Today", time: "10:00 AM", status: "confirmed" },
  { client: "Sophia Lee", service: "Hair Coloring", date: "Today", time: "12:30 PM", status: "pending" },
  { client: "Olivia Brown", service: "Bridal Styling", date: "Tomorrow", time: "3:00 PM", status: "confirmed" },
];

export default function SalonBookingsPage() {
  return (
    <PageLayout title="Bookings" description="Manage upcoming appointments and requests.">
      <div className="grid gap-3">
        {bookings.map((b, i) => (
          <RowCard
            key={i}
            icon={User}
            title={b.client}
            subtitle={`${b.service} · ${b.date} · ${b.time}`}
            badge={{
              text: b.status,
              tone: b.status === "confirmed" ? "success" : "gold",
            }}
            right={
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> {b.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {b.time}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
