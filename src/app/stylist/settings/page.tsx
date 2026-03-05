"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function StylistSettingsPage() {
  const [displayName, setDisplayName] = useState("Jessica");
  const [city, setCity] = useState("New York");
  const [bio, setBio] = useState("Bridal & event stylist. Home visits available.");

  return (
    <PageLayout title="Settings" description="Update your stylist profile (frontend demo).">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 max-w-2xl">
        <div>
          <p className="text-xs text-muted-foreground">Display name</p>
          <input
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">City</p>
          <input
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Bio</p>
          <textarea
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40 min-h-[110px]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <Button className="rounded-xl" onClick={() => toast.success("Saved (frontend demo)")}>
          Save changes
        </Button>
      </div>
    </PageLayout>
  );
}
