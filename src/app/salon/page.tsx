"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Scissors,
  Users,
  Star,
  TrendingUp,
  Wallet,
  Clock,
  User
} from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const stats = [
  { label: "Bookings", value: "128", icon: CalendarDays, trend: "+8%" },
  { label: "Services", value: "24", icon: Scissors, trend: "+2" },
  { label: "Staff", value: "11", icon: Users, trend: "+1" },
  { label: "Rating", value: "4.8", icon: Star, trend: "+0.1" },
  { label: "Earnings", value: "$9.4k", icon: Wallet, trend: "+12%" },
];

const bookings = [
  { client: "Emma Johnson", service: "Haircut", time: "10:00 AM" },
  { client: "Sophia Lee", service: "Hair Coloring", time: "12:30 PM" },
  { client: "Olivia Brown", service: "Bridal Styling", time: "3:00 PM" },
];

const staffActivity = [
  { name: "Jessica", action: "Completed bridal styling" },
  { name: "Michael", action: "Started haircut session" },
  { name: "Anna", action: "Customer consultation" },
];

export default function SalonDashboardPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-1"
      >
        <motion.h1 variants={item} className="text-xl font-semibold">
          Salon Dashboard
        </motion.h1>
        <motion.p variants={item} className="text-sm text-muted-foreground">
          Track bookings, staff, earnings, and reviews.
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
            <motion.div
              key={s.label}
              variants={item}
              className="rounded-2xl border border-border bg-card p-4"
            >
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

      {/* Two column section */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Recent bookings */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-3">Recent Bookings</h3>

          <div className="space-y-3">
            {bookings.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{b.client}</p>
                  <p className="text-xs text-muted-foreground">{b.service}</p>
                </div>

                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {b.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Staff activity */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-3">Staff Activity</h3>

          <div className="space-y-3">
            {staffActivity.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.action}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Summary */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="rounded-2xl border border-border bg-card p-5"
      >
        <h3 className="text-sm font-semibold">Today</h3>

        <p className="text-sm text-muted-foreground mt-1">
          You have <span className="font-semibold">7 bookings</span> and{" "}
          <span className="font-semibold">2 reviews</span> waiting.
        </p>
      </motion.div>

    </div>
  );
}
