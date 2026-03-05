"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { DollarSign, TrendingUp } from "lucide-react";

const cards = [
  { label: "This month", value: "$84,200" },
  { label: "Last month", value: "$77,900" },
  { label: "Avg order value", value: "$42.10" },
];

export default function AdminRevenuePage() {
  return (
    <PageLayout title="Revenue" description="Track platform earnings and trends.">
      <div className="grid md:grid-cols-3 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-xl font-semibold mt-1">{c.value}</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" /> Updated today
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
