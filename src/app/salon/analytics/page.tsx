"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { TrendingUp, Users, CalendarDays, DollarSign } from "lucide-react";

const cards = [
  { label: "Bookings", value: "128", icon: CalendarDays },
  { label: "Customers", value: "412", icon: Users },
  { label: "Revenue", value: "$9.2k", icon: DollarSign },
];

export default function SalonAnalyticsPage() {
  return (
    <PageLayout title="Analytics" description="High-level performance metrics.">
      <div className="grid md:grid-cols-3 gap-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-semibold mt-1">{c.value}</p>
                </div>
                <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" /> Updated today
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
