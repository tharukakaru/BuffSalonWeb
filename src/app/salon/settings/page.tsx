"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function SalonSettingsPage() {
  const [name, setName] = useState("BUFF Salon Downtown");
  const [location, setLocation] = useState("New York");

  return (
    <PageLayout title="Settings" description="Update salon details and preferences.">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 max-w-2xl">
        <div>
          <p className="text-xs text-muted-foreground">Salon name</p>
          <input
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Location</p>
          <input
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button
          className="rounded-xl"
          onClick={() => toast.success("Saved (frontend demo)")}
        >
          Save changes
        </Button>
      </div>
    </PageLayout>
  );
}
