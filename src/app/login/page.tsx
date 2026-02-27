"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "salon" | "stylist" | "event-stylist" | "vendor" | "admin">("customer");

  const handleLogin = () => {
    if (!email || !password) return;

    login({ email, role });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center mb-3">
            <Scissors className="h-6 w-6 text-background" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to continue to BUFF SALON
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="text-sm text-muted-foreground">Login As</label>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value as
                    | "customer"
                    | "salon"
                    | "stylist"
                    | "event-stylist"
                    | "vendor"
                    | "admin"
                )
              }
            >
              <option value="customer">Customer</option>
              <option value="salon">Salon Owner</option>
              <option value="stylist">Solo Stylist</option>
              <option value="event-stylist">Event Stylist</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Sign In Button */}
          <Button
            className="w-full bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </div>

        {/* Register link */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <span
            className="text-accent-gold cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
