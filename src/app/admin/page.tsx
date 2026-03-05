"use client";

import { motion } from "framer-motion";
import {
  Users,
  Building2,
  DollarSign,
  Bot,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Server
} from "lucide-react";
import { useRouter } from "next/navigation";

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const stats = [
  { label: "Total users", value: "12,491", icon: Users, trend: "+12%" },
  { label: "Salons", value: "284", icon: Building2, trend: "+4%" },
  { label: "Revenue", value: "$84.2k", icon: DollarSign, trend: "+9%" },
  { label: "AI queries", value: "14.2k", icon: Bot, trend: "+18%" },
];

const actions = [
  { label: "Manage users", path: "/admin/users", icon: Users },
  { label: "Manage salons", path: "/admin/salons", icon: Building2 },
  { label: "AI usage", path: "/admin/ai-usage", icon: Bot },
  { label: "Reports", path: "/admin/reports", icon: ShieldCheck },
];

const newUsers = [
  { name: "Emma Johnson", role: "Customer" },
  { name: "Sophia Lee", role: "Salon Owner" },
  { name: "Michael Brown", role: "Vendor" },
];

const systemLogs = [
  { event: "New salon registered", time: "5 min ago" },
  { event: "Vendor product uploaded", time: "18 min ago" },
  { event: "AI agent used", time: "35 min ago" },
];

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-1">
        <motion.h1 variants={item} className="text-xl font-semibold">
          Admin Dashboard
        </motion.h1>

        <motion.p variants={item} className="text-sm text-muted-foreground">
          Monitor platform metrics and manage operations.
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
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
                {s.trend} this month
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        <motion.h2
          variants={item}
          className="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
        >
          Quick actions
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((a) => {
            const Icon = a.icon;

            return (
              <motion.button
                key={a.label}
                variants={item}
                onClick={() => router.push(a.path)}
                className="rounded-2xl border border-border bg-card p-4 text-left hover:border-accent-gold/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent-gold" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">{a.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Open</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Two column section */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Recent registrations */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Recent Registrations
          </h3>

          <div className="space-y-3">
            {newUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium">{u.name}</span>
                <span className="text-xs text-muted-foreground">{u.role}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System activity */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Server className="h-4 w-4" />
            System Activity
          </h3>

          <div className="space-y-3">
            {systemLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{log.event}</span>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* System status */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="rounded-2xl border border-border bg-card p-5"
      >
        <h3 className="text-sm font-semibold">Platform Status</h3>

        <p className="text-sm text-muted-foreground mt-1">
          All systems operational. No incidents reported in the last 24 hours.
        </p>
      </motion.div>

    </div>
  );
}
