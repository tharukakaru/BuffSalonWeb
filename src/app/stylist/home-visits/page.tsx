"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Clock, User } from "lucide-react";

const visits = [
  { client: "Emma Johnson", service: "Bridal Hair", date: "Mar 10", time: "10:00 AM", location: "Downtown Apartment", status: "confirmed" },
  { client: "Sophia Lee", service: "Hair Styling", date: "Mar 12", time: "2:30 PM", location: "Client Home", status: "pending" },
];

export default function StylistHomeVisitsPage() {
  return (
    <PageLayout title="Home Visits" description="Manage home-visit requests and routes.">
      <div className="grid gap-3">
        {visits.map((v, i) => (
          <RowCard
            key={i}
            icon={User}
            title={v.client}
            subtitle={`${v.service} · ${v.location}`}
            badge={{ text: v.status, tone: v.status === "confirmed" ? "success" : "gold" }}
            right={
              <div className="min-w-0 text-xs text-muted-foreground">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Clock className="h-3 w-3" /> {v.date} · {v.time}
                  </span>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
