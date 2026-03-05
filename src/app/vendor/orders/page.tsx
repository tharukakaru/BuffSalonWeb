"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { ClipboardList } from "lucide-react";

const orders = [
  { id: "#1043", item: "Argan Oil Serum", qty: 2, status: "packed", total: "$44" },
  { id: "#1044", item: "Keratin Shampoo", qty: 5, status: "shipped", total: "$90" },
  { id: "#1045", item: "Silk Hair Mask", qty: 1, status: "pending", total: "$28" },
];

export default function VendorOrdersPage() {
  return (
    <PageLayout title="Orders" description="Track orders and fulfilment status.">
      <div className="grid gap-3">
        {orders.map((o) => (
          <RowCard
            key={o.id}
            icon={ClipboardList}
            title={`${o.id} · ${o.item}`}
            subtitle={`Qty ${o.qty}`}
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
