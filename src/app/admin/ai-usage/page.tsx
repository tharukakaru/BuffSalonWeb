"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const dailyUsage = [
  { day: "Mon", tokens: 2400 },
  { day: "Tue", tokens: 3100 },
  { day: "Wed", tokens: 2800 },
  { day: "Thu", tokens: 3600 },
  { day: "Fri", tokens: 4200 },
  { day: "Sat", tokens: 1800 },
  { day: "Sun", tokens: 1200 },
];

const topUsers = [
  { name: "Sarah M.", tokens: 342, cost: "$1.71" },
  { name: "Emily R.", tokens: 280, cost: "$1.40" },
  { name: "Jade L.", tokens: 195, cost: "$0.98" },
  { name: "Nina T.", tokens: 164, cost: "$0.82" },
];

export default function AdminAIUsagePage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto space-y-6">
      <motion.h1 variants={item} initial="hidden" animate="show" className="text-xl font-semibold">
        AI Usage
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-3"
      >
        <motion.div variants={item} className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Tokens</p>
          <p className="text-xl font-semibold">14.2K</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
          <p className="text-xl font-semibold">$71.00</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg per User</p>
          <p className="text-xl font-semibold">$0.42</p>
        </motion.div>
      </motion.div>

      <motion.div variants={item} initial="hidden" animate="show" className="rounded-xl border border-border p-4">
        <h3 className="text-sm font-semibold mb-4">Daily Token Usage</h3>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={dailyUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Bar dataKey="tokens" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        <motion.h2 variants={item} className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Top Users by AI Usage
        </motion.h2>

        {topUsers.map((u, i) => (
          <motion.div key={i} variants={item} className="rounded-xl border border-border p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-[10px]">
              {u.name.slice(0, 2)}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">{u.name}</p>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium">{u.tokens} tokens</p>
              <p className="text-[10px] text-muted-foreground">{u.cost}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
