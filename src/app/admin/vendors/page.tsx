"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Store, ShoppingBag } from "lucide-react";

const vendors = [
  { name: "HairCare Co.", products: 56, status: "active" },
  { name: "Beauty Supplies Ltd.", products: 112, status: "active" },
  { name: "Unknown Vendor", products: 3, status: "review" },
];

export default function AdminVendorsPage() {
  return (
    <PageLayout title="Vendors" description="Oversee vendors and product listings.">
      <div className="grid gap-3">
        {vendors.map((v) => (
          <RowCard
            key={v.name}
            icon={Store}
            title={v.name}
            subtitle={`${v.products} products`}
            badge={{
              text: v.status,
              tone: v.status === "active" ? "success" : "gold",
            }}
            right={
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <ShoppingBag className="h-3 w-3" />
                {v.products}
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
