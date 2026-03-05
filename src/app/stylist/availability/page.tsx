"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { CalendarDays } from "lucide-react";

const slots = [
  { day: "Mon – Fri", time: "9:00 AM – 6:00 PM", status: "active" },
  { day: "Saturday", time: "10:00 AM – 3:00 PM", status: "active" },
  { day: "Sunday", time: "Off", status: "muted" },
];

export default function StylistAvailabilityPage() {
  return (
    <PageLayout title="Availability" description="Set your working hours and open slots.">
      <div className="grid gap-3">
        {slots.map((s) => (
          <RowCard
            key={s.day}
            icon={CalendarDays}
            title={s.day}
            subtitle={s.time}
            badge={{
              text: s.status === "active" ? "available" : "off",
              tone: s.status === "active" ? "success" : "muted",
            }}
          />
        ))}
      </div>
    </PageLayout>
  );
}
