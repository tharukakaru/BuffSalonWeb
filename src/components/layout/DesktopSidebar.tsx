"use client";

import { useState } from "react";
import {
  Home,
  Compass,
  Bot,
  CalendarDays,
  User,
  Sparkles,
  Scissors,
  ShoppingBag,
  Bell,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const mainNav = [
  { path: "/home", label: "Dashboard", icon: Home },
  { path: "/explore", label: "Salons", icon: Compass },
  { path: "/stylists", label: "Stylists", icon: Scissors },
  { path: "/agent", label: "AI Agent", icon: Bot },
  { path: "/try-on", label: "AI Try-On", icon: Sparkles },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/bookings", label: "Bookings", icon: CalendarDays },
];

const bottomNav = [{ path: "/profile", label: "Profile", icon: User }];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const go = (path: string) => router.push(path);

  return (
    <aside
      className={cn(
        "hidden md:flex fixed left-0 top-0 bottom-0 flex-col bg-card border-r border-border z-50 transition-all duration-300",
        expanded ? "w-56" : "w-[68px]"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2.5 px-4 py-5",
          !expanded && "justify-center px-0"
        )}
      >
        <div className="h-9 w-9 rounded-xl bg-accent-gold flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-4.5 w-4.5 text-accent-gold-foreground" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-semibold tracking-tight overflow-hidden whitespace-nowrap"
            >
              Buff Salon
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2.5 py-2 space-y-1">
        {mainNav.map((tab) => {
          const isActive = pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.path}
              onClick={() => go(tab.path)}
              title={!expanded ? tab.label : undefined}
              className={cn(
                "relative w-full flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200",
                expanded ? "px-3 py-2.5" : "px-0 py-2.5 justify-center",
                isActive
                  ? "text-accent-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebar"
                  className="absolute inset-0 rounded-xl bg-accent-gold/10 border border-accent-gold/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className="h-[18px] w-[18px] relative z-10 flex-shrink-0"
                strokeWidth={isActive ? 2.2 : 1.6}
              />
              {expanded && (
                <span className="relative z-10 truncate">{tab.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2.5 pb-3 space-y-2">
        {/* Notifications */}
        <button
          title={!expanded ? "Notifications" : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all",
            expanded ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"
          )}
        >
          <Bell className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.6} />
          {expanded && <span>Notifications</span>}
        </button>

        {/* Credits */}
        {expanded ? (
          <div className="rounded-xl border border-border bg-secondary/40 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-accent-gold" />
                <span className="text-sm font-semibold">18</span>
              </div>
              <span className="text-[10px] text-muted-foreground">CREDITS</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>18 / 25</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-accent-gold to-accent-gold/70" />
            </div>
          </div>
        ) : (
          <button title="Credits: 18/25" className="w-full flex justify-center py-2.5">
            <Zap className="h-[18px] w-[18px] text-accent-gold" strokeWidth={1.6} />
          </button>
        )}

        {/* Profile */}
        {bottomNav.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => go(tab.path)}
              title={!expanded ? tab.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl transition-all",
                expanded ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"
              )}
            >
              <div className="h-8 w-8 rounded-full bg-accent-gold flex items-center justify-center text-accent-gold-foreground font-semibold text-xs flex-shrink-0">
                S
              </div>
              {expanded && (
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium truncate">Sarah</p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    sarah@glowup.com
                  </p>
                </div>
              )}
            </button>
          );
        })}

        {/* Collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center py-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
