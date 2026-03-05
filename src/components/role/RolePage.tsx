import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Info } from "lucide-react";

type Action = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
};

export default function RolePage({
  title,
  subtitle,
  actions = [],
  tips = [],
}: {
  title: string;
  subtitle?: string;
  actions?: Action[];
  tips?: string[];
}) {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          ) : null}
        </div>

        {actions.length ? (
          <div className="flex flex-wrap gap-2">
            {actions.map((a) => (
              <Button key={a.href} variant={a.variant ?? "default"} asChild className="h-9">
                <Link href={a.href}>
                  {a.label} <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="p-4 lg:col-span-2">
          <p className="text-sm font-medium">UI placeholder (Frontend only)</p>
          <p className="text-sm text-muted-foreground mt-1">
            This page is wired and ready. You can replace this content with the final Lovable UI
            anytime—route + layout + sidebar are already working.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
            {["Summary card", "Chart card", "Recent activity"].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-border bg-card p-3"
              >
                <p className="text-xs text-muted-foreground">{x}</p>
                <div className="h-10 mt-2 rounded-lg bg-secondary" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-accent-gold" />
            <p className="text-sm font-medium">Next steps</p>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {(tips.length
              ? tips
              : [
                  "Confirm route renders with the role sidebar",
                  "Hook real data later (Supabase/DB/API)",
                  "Replace placeholder with Lovable UI components",
                ]
            ).map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
