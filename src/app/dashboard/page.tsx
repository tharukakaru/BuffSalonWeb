"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth, Role } from "@/context/auth";
import { Scissors, Sparkles, Shield, Store, User } from "lucide-react";

const roleToRoute: Record<Role, string> = {
  customer: "/home",
  salon: "/salon",
  stylist: "/stylist",
  "event-stylist": "/event-stylist",
  vendor: "/vendor",
  admin: "/admin",
};

export default function DashboardGate() {
  const router = useRouter();
  const { isAuthenticated, role, setRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && role) router.replace(roleToRoute[role]);
  }, [isAuthenticated, role, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-gold" />
          <h1 className="text-xl font-bold">Select Dashboard</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose your role to enter the correct dashboard.
        </p>

        <div className="grid gap-2">
          <Button className="h-11" onClick={() => setRole("customer")}>
            <User className="h-4 w-4 mr-2" /> Customer
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setRole("salon")}>
            <Scissors className="h-4 w-4 mr-2" /> Salon Owner
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setRole("stylist")}>
            <Scissors className="h-4 w-4 mr-2" /> Solo Stylist
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setRole("event-stylist")}>
            <Sparkles className="h-4 w-4 mr-2" /> Event Stylist
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setRole("vendor")}>
            <Store className="h-4 w-4 mr-2" /> Vendor
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setRole("admin")}>
            <Shield className="h-4 w-4 mr-2" /> Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
