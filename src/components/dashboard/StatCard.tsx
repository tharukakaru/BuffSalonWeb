"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>

      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
        <Icon className="h-5 w-5 text-accent-gold" />
      </div>
    </div>
  );
}
