"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { TrendingUp, ShoppingBag, DollarSign, ClipboardList } from "lucide-react";

const cards = [
  { label: "Sales", value: "$6.1k", icon: DollarSign },
  { label: "Orders", value: "84", icon: ClipboardList },
  { label: "Active products", value: "56", icon: ShoppingBag },
];

export default function VendorAnalyticsPage() {
  return (
    <PageLayout title="Analytics" description="High-level performance overview.">
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
                <TrendingUp className="h-3 w-3" />
                Updated today
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold">Insight</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your top category this week is <span className="font-semibold">Hair Care</span>. Consider restocking best-sellers.
        </p>
      </div>
    </PageLayout>
  );
}
