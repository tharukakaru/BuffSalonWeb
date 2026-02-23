import {
  CalendarCheck,
  DollarSign,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    label: "Total Bookings",
    value: "128",
    icon: CalendarCheck,
    note: "+12 this week",
  },
  {
    label: "Revenue",
    value: "LKR 245,000",
    icon: DollarSign,
    note: "+8.4% vs last month",
  },
  {
    label: "New Customers",
    value: "32",
    icon: Users,
    note: "+5 today",
  },
  {
    label: "Growth",
    value: "18%",
    icon: TrendingUp,
    note: "steady increase",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
              BUFF Dashboard
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              Overview
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Quick glance at your bookings, revenue, and growth.
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            Updated just now
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card/50 p-6 hover:bg-card/60 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <div className="h-10 w-10 rounded-xl bg-accent-gold/15 border border-border/40 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-accent-gold" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h3 className="font-semibold">Upcoming Bookings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Next scheduled appointments.
          </p>

          <div className="mt-5 space-y-3">
            {[
              { name: "Haircut & Style", time: "Today • 4:30 PM", client: "Amara K." },
              { name: "Hair Coloring", time: "Tomorrow • 10:00 AM", client: "Ravi S." },
              { name: "Bridal Trial", time: "Sat • 2:00 PM", client: "Nina P." },
            ].map((b) => (
              <div
                key={b.name + b.time}
                className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-4 py-3"
              >
                <div>
                  <div className="font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.client}</div>
                </div>
                <div className="text-xs text-muted-foreground">{b.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h3 className="font-semibold">Sales Snapshot</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Placeholder for chart / analytics (we can add later).
          </p>

          <div className="mt-5 rounded-xl border border-border/40 bg-background/40 p-6 text-sm text-muted-foreground">
            Chart area (Coming Soon)
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/40 bg-background/40 px-4 py-3">
              <div className="text-xs text-muted-foreground">Orders</div>
              <div className="mt-1 text-lg font-bold">46</div>
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 px-4 py-3">
              <div className="text-xs text-muted-foreground">Avg Order</div>
              <div className="mt-1 text-lg font-bold">LKR 3,120</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
