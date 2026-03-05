"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function VendorSettingsPage() {
  const [storeName, setStoreName] = useState("HairCare Co.");
  const [supportEmail, setSupportEmail] = useState("vendor@haircareco.com");

  return (
    <PageLayout title="Settings" description="Update your vendor store settings (frontend demo).">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 max-w-2xl">
        <div>
          <p className="text-xs text-muted-foreground">Store name</p>
          <input
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Support email</p>
          <input
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent-gold/40"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
          />
        </div>

        <Button className="rounded-xl" onClick={() => toast.success("Saved (frontend demo)")}>
          Save changes
        </Button>
      </div>
    </PageLayout>
  );
}
