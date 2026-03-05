"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Users,
  Package,
  ShoppingBag,
  ClipboardList,
  BarChart3,
  Wallet,
  Star,
  Settings,
  Shield,
} from "lucide-react";

export type RoleNavItem = {
  label: string;
  path: string;
  icon: any;
};

export default function RoleShell({
  title,
  nav,
  children,
}: {
  title: string;
  nav: RoleNavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col border-r border-border bg-card">
        <div className="p-5 border-b border-border">
          <p className="text-xs text-muted-foreground">BUFF SALON</p>
          <h2 className="text-lg font-bold">{title}</h2>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active =
              pathname === item.path || pathname?.startsWith(item.path + "/");
            const Icon = item.icon ?? LayoutDashboard;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </div>
      </aside>

      {/* Content */}
      <main className="md:pl-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

/** Icons you might want for nav quickly */
export const RoleIcons = {
  Dashboard: LayoutDashboard,
  Bookings: CalendarDays,
  Services: Scissors,
  Staff: Users,
  Products: ShoppingBag,
  Orders: ClipboardList,
  Inventory: Package,
  Analytics: BarChart3,
  Earnings: Wallet,
  Reviews: Star,
  Settings: Settings,
  Admin: Shield,
};
