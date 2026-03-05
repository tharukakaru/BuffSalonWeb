"use client";

import { motion } from "framer-motion";
import {
  Package,
  ClipboardList,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  Wallet,
  AlertTriangle,
} from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const stats = [
  { label: "Products", value: "56", icon: ShoppingBag, trend: "+3" },
  { label: "Inventory", value: "1,420", icon: Package, trend: "-12" },
  { label: "Orders", value: "84", icon: ClipboardList, trend: "+9%" },
  { label: "Revenue", value: "$6.1k", icon: Wallet, trend: "+11%" },
  { label: "Analytics", value: "Up", icon: BarChart3, trend: "+5%" },
];

const topProducts = [
  { name: "Argan Oil Serum", sold: 128, revenue: "$2,048" },
  { name: "Keratin Shampoo", sold: 94, revenue: "$1,692" },
  { name: "Silk Hair Mask", sold: 76, revenue: "$1,216" },
];

const recentOrders = [
  { id: "#1043", item: "Argan Oil Serum", qty: 2, status: "Packed" },
  { id: "#1044", item: "Keratin Shampoo", qty: 5, status: "Shipped" },
  { id: "#1045", item: "Silk Hair Mask", qty: 1, status: "Pending" },
];

const lowStock = [
  { product: "Silk Hair Mask", stock: 6 },
  { product: "Heat Protect Spray", stock: 4 },
  { product: "Curl Cream", stock: 9 },
];

export default function VendorDashboardPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-1">
        <motion.h1 variants={item} className="text-xl font-semibold">
          Vendor Dashboard
        </motion.h1>
        <motion.p variants={item} className="text-sm text-muted-foreground">
          Manage listings, inventory, orders, and performance.
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-5 gap-3"
      >
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} variants={item} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-semibold mt-1">{s.value}</p>
                </div>
                <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                {s.trend}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Top products */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-3">Top Selling Products</h3>

          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sold} sold</p>
                </div>
                <p className="text-sm font-semibold">{p.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent orders */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-3">Recent Orders</h3>

          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {o.id} · {o.item}
                  </p>
                  <p className="text-xs text-muted-foreground">Qty {o.qty}</p>
                </div>

                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    o.status === "Shipped"
                      ? "bg-success/15 text-success"
                      : o.status === "Packed"
                      ? "bg-accent-gold/15 text-accent-gold"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Low stock alert */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="rounded-2xl border border-border bg-card p-5"
      >
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-accent-gold" />
          Low Stock Alerts
        </h3>

        <p className="text-sm text-muted-foreground mt-1">
          Low stock alerts are enabled. <span className="font-semibold">{lowStock.length}</span> products need restocking.
        </p>

        <div className="mt-3 grid md:grid-cols-3 gap-2">
          {lowStock.map((s) => (
            <div key={s.product} className="rounded-xl border border-border p-3">
              <p className="text-sm font-medium">{s.product}</p>
              <p className="text-xs text-muted-foreground">Stock: {s.stock}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
