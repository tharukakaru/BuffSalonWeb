"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Scissors, Star } from "lucide-react";

const stylists = [
  { name: "Jessica", specialty: "Bridal Hair", rating: "4.9", status: "active" },
  { name: "Anna", specialty: "Hair Color", rating: "4.8", status: "active" },
  { name: "Nina", specialty: "Home Visits", rating: "4.6", status: "review" },
];

export default function AdminStylistsPage() {
  return (
    <PageLayout title="Stylists" description="Manage stylist onboarding and performance.">
      <div className="grid gap-3">
        {stylists.map((s) => (
          <RowCard
            key={s.name}
            icon={Scissors}
            title={s.name}
            subtitle={s.specialty}
            badge={{
              text: s.status,
              tone: s.status === "active" ? "success" : "gold",
            }}
            right={
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3 text-accent-gold" />
                {s.rating}
              </span>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
