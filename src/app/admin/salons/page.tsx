"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Building2, MapPin } from "lucide-react";

const salons = [
  { name: "BUFF Downtown", location: "New York", status: "verified" },
  { name: "Elite Hair Studio", location: "Los Angeles", status: "pending" },
  { name: "Glow Salon", location: "Miami", status: "verified" },
];

export default function AdminSalonsPage() {
  return (
    <PageLayout title="Salons" description="Approve and manage salon partners.">
      <div className="grid gap-3">
        {salons.map((s) => (
          <RowCard
            key={s.name}
            icon={Building2}
            title={s.name}
            subtitle={s.location}
            badge={{
              text: s.status,
              tone: s.status === "verified" ? "success" : "gold",
            }}
            right={
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {s.location}
              </span>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
