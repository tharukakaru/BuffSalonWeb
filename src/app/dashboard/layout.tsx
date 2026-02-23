"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  Settings,
  LogOut,
  Scissors,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/products": "Products",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
};

const LS_SIDEBAR_KEY = "buff:sidebarCollapsed";

function SidebarContent({
  pathname,
  collapsed,
  onNavigate,
  onLogout,
  onToggleCollapse,
}: {
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
  onToggleCollapse?: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-2 overflow-hidden">
          <Scissors className="h-5 w-5 text-accent-gold shrink-0" />
          {!collapsed && (
            <span className="font-bold tracking-tight whitespace-nowrap">
              BUFF SALON
            </span>
          )}
        </div>

        {/* Desktop collapse toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:inline-flex p-2 rounded-md hover:bg-muted/40"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <nav className={cn("flex-1 py-6 space-y-2", collapsed ? "px-2" : "px-4")}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm transition-colors",
                collapsed ? "px-3 py-2 justify-center" : "px-3 py-2",
                active
                  ? "bg-accent-gold/20 text-accent-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={cn("border-t border-border", collapsed ? "p-2" : "p-4")}>
        <Button
          variant="outline"
          className={cn(
            "w-full gap-2",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
          onClick={onLogout}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const currentTitle = pageTitles[pathname] ?? "Dashboard";

  // Load sidebar state once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_SIDEBAR_KEY);
      setCollapsed(raw === "true");
    } catch {}
  }, []);

  // Guard
  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const desktopSidebarWidth = useMemo(() => (collapsed ? "w-16" : "w-64"), [collapsed]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    router.push("/");
  };

  const toggleCollapsed = () => {
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem(LS_SIDEBAR_KEY, String(next));
      } catch {}
      return next;
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          desktopSidebarWidth,
          "border-r border-border bg-card/40 backdrop-blur-sm hidden md:flex flex-col transition-[width] duration-200"
        )}
      >
        <SidebarContent
          pathname={pathname}
          collapsed={collapsed}
          onLogout={handleLogout}
          onToggleCollapse={toggleCollapsed}
        />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="absolute inset-y-0 left-0 w-72 border-r border-border bg-background">
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-accent-gold" />
                <span className="font-bold tracking-tight">BUFF SALON</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-muted/40"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[calc(100%-4rem)]">
              <SidebarContent
                pathname={pathname}
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted/40"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">{currentTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:block text-xs text-muted-foreground">
              BUFF Admin
            </div>
          </div>
        </div>

        {/* Page transitions */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-4 md:p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
