"use client";

import { useMemo, useState } from "react";
import { Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";

const categories = [
  "All",
  "Shampoo",
  "Conditioner",
  "Treatment",
  "Styling",
  "Tools",
  "Color",
];

const products = [
  {
    id: 1,
    name: "Silk Repair Shampoo",
    brand: "Lily Luxe",
    price: 28.99,
    rating: 4.8,
    reviews: 142,
    category: "Shampoo",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop",
    bestseller: true,
  },
  {
    id: 2,
    name: "Deep Hydration Mask",
    brand: "Oribe",
    price: 54.0,
    rating: 4.9,
    reviews: 203,
    category: "Treatment",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    bestseller: true,
  },
  {
    id: 3,
    name: "Volume Boost Conditioner",
    brand: "Kerastase",
    price: 36.5,
    rating: 4.7,
    reviews: 98,
    category: "Conditioner",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
    bestseller: false,
  },
  {
    id: 4,
    name: "Heat Shield Spray",
    brand: "Moroccanoil",
    price: 24.0,
    rating: 4.6,
    reviews: 176,
    category: "Styling",
    image:
      "https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=400&h=400&fit=crop",
    bestseller: false,
  },
  {
    id: 5,
    name: "Argan Oil Serum",
    brand: "Lily Luxe",
    price: 42.0,
    rating: 4.9,
    reviews: 321,
    category: "Treatment",
    image:
      "https://images.unsplash.com/photo-1608181831718-c9ffd8685965?w=400&h=400&fit=crop",
    bestseller: true,
  },
  {
    id: 6,
    name: "Curl Defining Cream",
    brand: "DevaCurl",
    price: 32.0,
    rating: 4.7,
    reviews: 89,
    category: "Styling",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    bestseller: false,
  },
  {
    id: 7,
    name: "Ceramic Flat Iron Pro",
    brand: "GHD",
    price: 189.0,
    rating: 4.8,
    reviews: 456,
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54f838f52?w=400&h=400&fit=crop",
    bestseller: true,
  },
  {
    id: 8,
    name: "Root Touch Up Kit",
    brand: "Madison Reed",
    price: 28.0,
    rating: 4.5,
    reviews: 67,
    category: "Color",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop",
    bestseller: false,
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { addItem, count } = useCart();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)),
    );
  }, [activeCategory, search]);

  const handleAddToCart = (p: (typeof products)[0]) => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to cart.");
      router.push("/login");
      return;
    }

    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    });

    toast.success("Added to cart", {
      description: `${p.name} • Cart: ${count + 1} item(s)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Shop Products
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Premium hair care products curated for you.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-card border border-border/50 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "gradient-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {product.bestseller && (
                    <span className="absolute top-3 left-3 gradient-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">
                    {product.brand}
                  </p>
                  <h3 className="text-base font-display font-bold text-foreground mb-2 leading-tight">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                    <span className="text-sm font-body font-medium text-foreground">
                      {product.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-body font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>

                    <Button
                      variant="hero"
                      size="sm"
                      className="rounded-full text-xs px-4"
                      onClick={() => handleAddToCart(product)}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
