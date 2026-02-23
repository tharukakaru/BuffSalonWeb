"use client";

import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center mb-3">
            <Scissors className="h-6 w-6 text-background" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join BUFF SALON in seconds
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Full Name</label>
            <input
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
            onClick={() => {
              login();
              router.push("/dashboard");
            }}
          >
            Sign Up
          </Button>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-accent-gold cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
