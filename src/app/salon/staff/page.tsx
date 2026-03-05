"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Users, Star } from "lucide-react";

const staff = [
  { name: "Jessica", role: "Senior Stylist", rating: "4.9" },
  { name: "Michael", role: "Hair Specialist", rating: "4.7" },
  { name: "Anna", role: "Color Expert", rating: "4.8" },
];

export default function SalonStaffPage() {
  return (
    <PageLayout title="Staff" description="Manage your salon team and roles.">
      <div className="grid gap-3">
        {staff.map((s) => (
          <RowCard
            key={s.name}
            icon={Users}
            title={s.name}
            subtitle={s.role}
            right={
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 text-accent-gold" />
                {s.rating}
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
