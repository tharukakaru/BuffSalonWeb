"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Package, AlertTriangle } from "lucide-react";

const inventory = [
  { product: "Argan Oil Serum", stock: 42, threshold: 10 },
  { product: "Keratin Shampoo", stock: 80, threshold: 20 },
  { product: "Silk Hair Mask", stock: 14, threshold: 15 },
  { product: "Heat Protect Spray", stock: 5, threshold: 15 },
];

export default function VendorInventoryPage() {
  return (
    <PageLayout title="Inventory" description="Monitor stock levels and low-stock alerts.">
      <div className="grid gap-3">
        {inventory.map((i) => {
          const low = i.stock <= i.threshold;
          return (
            <RowCard
              key={i.product}
              icon={Package}
              title={i.product}
              subtitle={`Threshold: ${i.threshold}`}
              badge={{ text: low ? "low" : "ok", tone: low ? "gold" : "success" }}
              right={
                <span className={`text-xs flex items-center gap-1 ${low ? "text-accent-gold" : "text-muted-foreground"}`}>
                  {low ? <AlertTriangle className="h-3 w-3" /> : null}
                  Stock {i.stock}
                </span>
              }
            />
          );
        })}
      </div>
    </PageLayout>
  );
}
