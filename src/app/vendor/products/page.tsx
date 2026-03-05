"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { ShoppingBag, Package } from "lucide-react";

const products = [
  { name: "Argan Oil Serum", price: "$32", stock: 42, status: "active" },
  { name: "Keratin Shampoo", price: "$18", stock: 80, status: "active" },
  { name: "Silk Hair Mask", price: "$28", stock: 14, status: "low" },
];

export default function VendorProductsPage() {
  return (
    <PageLayout title="Products" description="Manage your product listings.">
      <div className="grid gap-3">
        {products.map((p) => (
          <RowCard
            key={p.name}
            icon={ShoppingBag}
            title={p.name}
            subtitle={`Price: ${p.price}`}
            badge={{
              text: p.status,
              tone: p.status === "active" ? "success" : "gold",
            }}
            right={
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Package className="h-3 w-3" />
                Stock {p.stock}
              </span>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
