"use client";

import { useRouter } from "next/navigation";

const cards = [
  { title: "Products", path: "/vendor/products", desc: "Manage your product listings" },
  { title: "Orders", path: "/vendor/orders", desc: "Process customer orders" },
  { title: "Inventory", path: "/vendor/inventory", desc: "Stock levels & alerts" },
  { title: "Earnings", path: "/vendor/earnings", desc: "Payouts and reports" },
];

export default function VendorDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {cards.map((c) => (
          <button
            key={c.path}
            onClick={() => router.push(c.path)}
            className="text-left rounded-2xl border border-border bg-card p-4 hover:border-accent-gold/30 transition-colors"
          >
            <p className="text-sm font-semibold">{c.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
