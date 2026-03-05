"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Scissors } from "lucide-react";

const services = [
  { name: "Haircut", duration: "30 min", price: "$25", status: "active" },
  { name: "Hair Coloring", duration: "90 min", price: "$60", status: "active" },
  { name: "Bridal Styling", duration: "2 hrs", price: "$120", status: "featured" },
];

export default function SalonServicesPage() {
  return (
    <PageLayout title="Services" description="Edit services, prices and durations.">
      <div className="grid gap-3">
        {services.map((s) => (
          <RowCard
            key={s.name}
            icon={Scissors}
            title={s.name}
            subtitle={`${s.duration}`}
            badge={{ text: s.status, tone: s.status === "active" ? "success" : "gold" }}
            right={<span className="text-sm font-semibold">{s.price}</span>}
          />
        ))}
      </div>
    </PageLayout>
  );
}
