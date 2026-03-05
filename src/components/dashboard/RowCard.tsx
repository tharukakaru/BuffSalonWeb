"use client";

import { LucideIcon } from "lucide-react";

export default function RowCard({
  title,
  subtitle,
  right,
  icon: Icon,
  badge,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  icon?: LucideIcon;
  badge?: { text: string; tone?: "gold" | "success" | "muted" };
}) {
  const badgeClass =
    badge?.tone === "success"
      ? "bg-success/15 text-success"
      : badge?.tone === "gold"
      ? "bg-accent-gold/15 text-accent-gold"
      : "bg-secondary text-muted-foreground";

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {Icon ? (
          <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold truncate">{title}</p>
            {badge ? (
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
                {badge.text}
              </span>
            ) : null}
          </div>
          {subtitle ? <p className="text-xs text-muted-foreground truncate">{subtitle}</p> : null}
        </div>
      </div>

      {right ? <div className="flex-shrink-0">{right}</div> : null}
    </div>
  );
}
