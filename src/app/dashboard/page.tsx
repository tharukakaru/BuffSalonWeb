"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function DashboardGate() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    // If not logged in → go to login
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const role = user?.role;

    if (!role) {
      router.replace("/login");
      return;
    }

    // Redirect based on role
    if (role === "customer") router.replace("/home");
    else if (role === "salon") router.replace("/salon");
    else if (role === "stylist") router.replace("/stylist");
    else if (role === "event-stylist") router.replace("/event-stylist");
    else if (role === "vendor") router.replace("/vendor");
    else if (role === "admin") router.replace("/admin");
  }, [isLoggedIn, user, router]);

  return null;
}
