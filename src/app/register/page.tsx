"use client";

import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 space-y-4">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center mb-3">
            <Scissors className="h-6 w-6 text-background" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">BUFF SALON</p>
        </div>

        <div className="space-y-3">
          <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" placeholder="Name" />
          <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" placeholder="Email" />
          <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" placeholder="Password" type="password" />
        </div>

        <Button className="w-full bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90" onClick={() => router.push("/login")}>
          Sign Up
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <span className="text-accent-gold cursor-pointer" onClick={() => router.push("/login")}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
