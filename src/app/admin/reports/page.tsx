"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { ShieldCheck, FileText } from "lucide-react";

const reports = [
  { title: "Fraud report", desc: "Suspicious vendor activity detected", status: "open" },
  { title: "Dispute", desc: "Customer booking refund request", status: "review" },
  { title: "Content report", desc: "Inappropriate salon listing", status: "closed" },
];

export default function AdminReportsPage() {
  return (
    <PageLayout title="Reports" description="Handle platform reports and disputes.">
      <div className="grid gap-3">
        {reports.map((r) => (
          <RowCard
            key={r.title}
            icon={FileText}
            title={r.title}
            subtitle={r.desc}
            badge={{
              text: r.status,
              tone: r.status === "closed" ? "success" : r.status === "review" ? "gold" : "muted",
            }}
            right={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
          />
        ))}
      </div>
    </PageLayout>
  );
}
