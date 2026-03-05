"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Wallet } from "lucide-react";

const payouts = [
  { period: "This month", amount: "$9,240", status: "processing" },
  { period: "Last month", amount: "$8,310", status: "paid" },
];

export default function SalonEarningsPage() {
  return (
    <PageLayout title="Earnings" description="Track payouts and monthly revenue.">
      <div className="grid gap-3">
        {payouts.map((p) => (
          <RowCard
            key={p.period}
            icon={Wallet}
            title={p.period}
            subtitle="Payout summary"
            badge={{ text: p.status, tone: p.status === "paid" ? "success" : "gold" }}
            right={<span className="text-sm font-semibold">{p.amount}</span>}
          />
        ))}
      </div>
    </PageLayout>
  );
}
