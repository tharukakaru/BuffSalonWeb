"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Star,
  Plus,
  Minus,
  Sparkles,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviews: number;
  price: number;
  tag: string;
};

const products: Product[] = [
  { id: "p1", name: "Keratin Repair Shampoo", brand: "Buff Care", rating: 4.8, reviews: 312, price: 3200, tag: "Best seller" },
  { id: "p2", name: "Nourishing Hair Mask", brand: "Buff Care", rating: 4.7, reviews: 210, price: 2800, tag: "Top rated" },
  { id: "p3", name: "Heat Protect Spray", brand: "Buff Pro", rating: 4.6, reviews: 168, price: 2400, tag: "Styling" },
  { id: "p4", name: "Argan Oil Serum", brand: "Buff Pro", rating: 4.9, reviews: 402, price: 3500, tag: "Premium" },
  { id: "p5", name: "Curl Defining Cream", brand: "Buff Curl", rating: 4.7, reviews: 192, price: 2600, tag: "Curls" },
  { id: "p6", name: "Anti-Dandruff Tonic", brand: "Buff Care", rating: 4.5, reviews: 121, price: 1900, tag: "Care" },
];

const categories = ["All", "Care", "Styling", "Curls", "Premium", "Best seller"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function ShopPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || `${p.name} ${p.brand}`.toLowerCase().includes(q);
      const matchesCat = cat === "All" || p.tag.toLowerCase() === cat.toLowerCase();
      // Also allow category matching by tag keywords
      const matchesLoose =
        cat === "All" ||
        p.tag.toLowerCase().includes(cat.toLowerCase()) ||
        p.name.toLowerCase().includes(cat.toLowerCase());
      return matchesQuery && (matchesCat || matchesLoose);
    });
  }, [query, cat]);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = products.find((x) => x.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  }, [cart]);

  const inc = (id: string) => setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setCart((prev) => {
      const next = { ...prev };
      const q = (next[id] ?? 0) - 1;
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5 pb-24">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent-gold" />
            Shop
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Curated hair & beauty products (frontend demo).
          </p>
        </div>

        <Button
          variant="outline"
          className="h-10"
          onClick={() => {
            toast.info("Filters coming soon");
          }}
        >
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-border bg-card p-2 flex items-center gap-2">
        <div className="pl-2 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 bg-transparent text-sm outline-none px-2 py-2"
        />
        <Button
          variant="outline"
          className="h-9"
          onClick={() => {
            toast.info("Ask AI for recommendations");
            router.push("/agent");
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" /> Ask AI
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              cat === c ? "bg-accent-gold text-accent-gold-foreground" : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p) => {
          const qty = cart[p.id] ?? 0;

          return (
            <motion.div
              key={p.id}
              variants={item}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-accent-gold/30 transition-colors"
            >
              <div className="h-28 bg-secondary relative">
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-accent-gold/15 text-accent-gold text-[10px] font-semibold">
                  {p.tag}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                  </div>
                  <p className="text-sm font-bold text-accent-gold">LKR {p.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                    {p.rating}
                  </span>
                  <span>({p.reviews} reviews)</span>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {qty === 0 ? (
                    <Button
                      className="h-9"
                      onClick={() => {
                        inc(p.id);
                        toast.success("Added to cart");
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(p.id)}
                        className="h-9 w-9 rounded-xl border border-border bg-secondary flex items-center justify-center"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{qty}</span>
                      <button
                        onClick={() => inc(p.id)}
                        className="h-9 w-9 rounded-xl border border-border bg-secondary flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="h-9"
                    onClick={() => toast.info("Product details page not needed for submission")}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          No products found. Try another search or category.
        </div>
      )}

      {/* Cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg">
          <div className="rounded-2xl bg-card border border-accent-gold/30 shadow-xl shadow-accent-gold/10 p-4 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold">{cartCount} item(s) in cart</p>
              <p className="text-xs text-accent-gold font-medium">LKR {cartTotal.toLocaleString()}</p>
            </div>

            <Button
              className="bg-gradient-to-r from-accent-gold to-accent-gold/85 text-background font-semibold px-5"
              onClick={() => toast.success("Checkout will be handled by backend later")}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
