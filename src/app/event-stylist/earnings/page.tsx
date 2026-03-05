"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Wallet, TrendingUp } from "lucide-react";

const payouts = [
  { period: "This month", amount: "$3,200", status: "processing" },
  { period: "Last month", amount: "$2,740", status: "paid" },
];

export default function EventEarningsPage() {
  return (
    <PageLayout title="Earnings" description="Track event income and payouts.">
      <div className="grid gap-3">
        {payouts.map((p) => (
          <RowCard
            key={p.period}
            icon={Wallet}
            title={p.period}
            subtitle="Payout summary"
            badge={{ text: p.status, tone: p.status === "paid" ? "success" : "gold" }}
            right={
              <div className="text-right">
                <p className="text-sm font-semibold">{p.amount}</p>
                <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  trend
                </p>
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
