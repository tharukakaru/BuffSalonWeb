"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { CalendarDays, Users, MapPin } from "lucide-react";

const events = [
  { client: "Jessica & Tom", type: "Wedding", date: "Mar 15", party: 6, location: "The Plaza Hotel", status: "confirmed" },
  { client: "Emily R.", type: "Prom", date: "Mar 22", party: 4, location: "Client Home", status: "pending" },
];

export default function StylistEventsPage() {
  return (
    <PageLayout title="Events" description="Upcoming event & wedding jobs.">
      <div className="grid gap-3">
        {events.map((e, i) => (
          <RowCard
            key={i}
            icon={CalendarDays}
            title={e.client}
            subtitle={`${e.type} · ${e.date}`}
            badge={{ text: e.status, tone: e.status === "confirmed" ? "success" : "gold" }}
            right={
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {e.party}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {e.location}
                </span>
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
