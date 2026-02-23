"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
};

const initialProducts: Product[] = [
  { id: 1, name: "Keratin Shampoo", price: "LKR 2,900", stock: 18, category: "Hair" },
  { id: 2, name: "Hair Serum", price: "LKR 3,500", stock: 12, category: "Hair" },
  { id: 3, name: "Beard Oil", price: "LKR 2,200", stock: 25, category: "Grooming" },
  { id: 4, name: "Face Mask", price: "LKR 1,800", stock: 9, category: "Skin" },
  { id: 5, name: "Heat Protect Spray", price: "LKR 2,650", stock: 6, category: "Hair" },
];

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProducts
      .filter((p) => (onlyLowStock ? p.stock < 10 : true))
      .filter((p) =>
        q.length === 0
          ? true
          : `${p.name} ${p.category} ${p.price}`.toLowerCase().includes(q)
      );
  }, [query, onlyLowStock]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-accent-gold/15 border border-border/40 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-accent-gold" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your store items, pricing, and inventory status.
            </p>
          </div>

          <Button className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Controls */}
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, category, price..."
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          <button
            onClick={() => setOnlyLowStock((v) => !v)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors ${
              onlyLowStock
                ? "border-destructive/40 text-destructive bg-destructive/10"
                : "border-border text-muted-foreground bg-background/40 hover:bg-muted/20 hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" />
            Low stock only
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 text-xs text-muted-foreground border-b border-border">
          <div className="col-span-5">Product</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Stock</div>
        </div>

        {products.length === 0 ? (
          <div className="px-5 py-10 text-sm text-muted-foreground">
            No products found.
          </div>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 px-5 py-4 text-sm border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
            >
              <div className="col-span-5 font-medium">{p.name}</div>
              <div className="col-span-3 text-muted-foreground">{p.category}</div>
              <div className="col-span-2 text-muted-foreground">{p.price}</div>
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs border ${
                    p.stock < 10
                      ? "border-destructive/40 text-destructive bg-destructive/10"
                      : "border-border text-muted-foreground bg-muted/10"
                  }`}
                >
                  {p.stock} in stock
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer note */}
      <div className="text-xs text-muted-foreground">
        Tip: We can connect this to your real backend/API later. For now, it’s UI-only.
      </div>
    </div>
  );
}
