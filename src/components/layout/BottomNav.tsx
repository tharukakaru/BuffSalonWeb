"use client";

import { Home, Compass, Bot, CalendarDays, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tabs = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/explore", label: "Salons", icon: Compass },
  { path: "/agent", label: "Agent", icon: Bot },
  { path: "/bookings", label: "Bookings", icon: CalendarDays },
  { path: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] transition-colors rounded-xl",
                isActive ? "text-accent-gold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-accent-gold/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="h-5 w-5 relative z-10" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="relative z-10 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
