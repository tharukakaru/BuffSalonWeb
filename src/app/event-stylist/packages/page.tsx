"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Sparkles, DollarSign } from "lucide-react";

const packages = [
  { name: "Bridal Basic", desc: "Trial + wedding day styling", price: "$220", status: "active" },
  { name: "VIP Bridal", desc: "Bride + 3 bridesmaids + touch-ups", price: "$480", status: "featured" },
  { name: "Event Glam", desc: "Updo / glam styling (1 person)", price: "$80", status: "active" },
];

export default function EventPackagesPage() {
  return (
    <PageLayout title="Packages" description="Manage bridal and event packages.">
      <div className="grid gap-3">
        {packages.map((p) => (
          <RowCard
            key={p.name}
            icon={Sparkles}
            title={p.name}
            subtitle={p.desc}
            badge={{
              text: p.status,
              tone: p.status === "active" ? "success" : "gold",
            }}
            right={
              <span className="text-sm font-semibold flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {p.price.replace("$", "")}
              </span>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
