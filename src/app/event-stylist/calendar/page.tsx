"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { CalendarDays, Clock } from "lucide-react";

const schedule = [
  { title: "Bridal trial", date: "Aug 03", time: "11:00 AM", status: "confirmed" },
  { title: "VIP consult", date: "Aug 07", time: "4:00 PM", status: "pending" },
  { title: "Wedding day", date: "Aug 12", time: "8:00 AM", status: "confirmed" },
];

export default function EventCalendarPage() {
  return (
    <PageLayout title="Calendar" description="Your upcoming schedule and events.">
      <div className="grid gap-3">
        {schedule.map((s) => (
          <RowCard
            key={`${s.title}-${s.date}`}
            icon={CalendarDays}
            title={s.title}
            subtitle={`${s.date} · ${s.time}`}
            badge={{ text: s.status, tone: s.status === "confirmed" ? "success" : "gold" }}
            right={
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {s.time}
              </span>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
