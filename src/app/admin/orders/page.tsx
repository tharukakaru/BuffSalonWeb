"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { ClipboardList } from "lucide-react";

const orders = [
  { id: "#1043", item: "Argan Oil Serum", status: "shipped", total: "$44" },
  { id: "#1044", item: "Keratin Shampoo", status: "packed", total: "$90" },
  { id: "#1045", item: "Silk Hair Mask", status: "pending", total: "$28" },
];

export default function AdminOrdersPage() {
  return (
    <PageLayout title="Orders" description="Track platform product orders.">
      <div className="grid gap-3">
        {orders.map((o) => (
          <RowCard
            key={o.id}
            icon={ClipboardList}
            title={`${o.id} · ${o.item}`}
            subtitle={`Total: ${o.total}`}
            badge={{
              text: o.status,
              tone: o.status === "shipped" ? "success" : o.status === "packed" ? "gold" : "muted",
            }}
            right={<span className="text-sm font-semibold">{o.total}</span>}
          />
        ))}
      </div>
    </PageLayout>
  );
}
