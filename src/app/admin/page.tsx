"use client";

import { useRouter } from "next/navigation";

const cards = [
  { title: "Users", path: "/admin/users", desc: "Manage platform users" },
  { title: "Bookings", path: "/admin/bookings", desc: "View all bookings" },
  { title: "Orders", path: "/admin/orders", desc: "Track orders" },
  { title: "Revenue", path: "/admin/revenue", desc: "Revenue overview" },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
