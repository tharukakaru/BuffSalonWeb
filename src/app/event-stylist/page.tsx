"use client";

import { motion } from "framer-motion";
import { CalendarDays, Users, Sparkles, Wallet, TrendingUp, Image } from "lucide-react";

const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const stats = [
  { label: "Upcoming events", value: "6", icon: CalendarDays, trend: "+2" },
  { label: "Clients", value: "18", icon: Users, trend: "+4" },
  { label: "Packages", value: "5", icon: Sparkles, trend: "+1" },
  { label: "Gallery items", value: "42", icon: Image, trend: "+6" },
  { label: "Earnings", value: "$3.2k", icon: Wallet, trend: "+9%" },
];

export default function EventStylistDashboardPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-6">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-1">
        <motion.h1 variants={item} className="text-xl font-semibold">
          Event Stylist Dashboard
        </motion.h1>
        <motion.p variants={item} className="text-sm text-muted-foreground">
          Manage event bookings, packages, and your gallery.
        </motion.p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
    </div>
  );
}
