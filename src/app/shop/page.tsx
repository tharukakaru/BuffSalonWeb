"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Sparkles,
  X,
  CreditCard,
  Banknote,
  Smartphone,
  Heart,
  Minus,
  Plus,
  Trash2,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const categories = ["All", "Hair Care", "Styling Tools", "Professional", "Wedding", "Luxury"];

type Product = {
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  aiPick: boolean;
  category: string;
};

const products: Product[] = [
  { name: "Silk Repair Serum", brand: "GlowUp Pro", price: 2499, rating: 4.8, reviews: 142, aiPick: true, category: "Hair Care" },
  { name: "Ceramic Curling Iron", brand: "StyleMaster", price: 6499, rating: 4.6, reviews: 98, aiPick: false, category: "Styling Tools" },
  { name: "Bridal Shine Spray", brand: "Luxe Locks", price: 1899, rating: 4.9, reviews: 76, aiPick: true, category: "Wedding" },
  { name: "Deep Moisture Mask", brand: "Natural Glow", price: 1599, rating: 4.7, reviews: 203, aiPick: false, category: "Hair Care" },
  { name: "Professional Blow Dryer", brand: "StyleMaster", price: 9999, rating: 4.5, reviews: 167, aiPick: false, category: "Professional" },
  { name: "Argan Oil Treatment", brand: "GlowUp Pro", price: 3299, rating: 4.9, reviews: 312, aiPick: true, category: "Luxury" },
];

type CartItem = Product & { qty: number };

const paymentMethods = [
  { id: "helapay", label: "helaPay", desc: "Pay with helaPay", icon: Smartphone },
  { id: "card", label: "Card", desc: "Visa / Mastercard", icon: CreditCard },
  { id: "cash", label: "Cash on Delivery", desc: "Pay when delivered", icon: Banknote },
];

const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("helapay");
  const [coupon, setCoupon] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => (activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) return prev.map((i) => (i.name === product.name ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) => prev.map((i) => (i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
    toast("Removed from cart");
  };

  const toggleSave = (name: string) => {
    setSaved((prev) => {
      const n = new Set(prev);
      if (n.has(name)) {
        n.delete(name);
        toast("Removed from wishlist");
      } else {
        n.add(name);
        toast.success("Saved!");
      }
      return n;
    });
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const discount = coupon.trim().toUpperCase() === "BUFF10" ? Math.round(total * 0.1) : 0;
  const grandTotal = Math.max(0, total - discount);

  const handleCheckout = () => {
    const method = paymentMethods.find((p) => p.id === selectedPayment);
    toast.success(`Order placed! Payment: ${method?.label} · Total: LKR ${grandTotal.toLocaleString()}`);
    setCart([]);
    setCoupon("");
    setShowCart(false);
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <motion.h1 variants={item} initial="hidden" animate="show" className="text-xl font-semibold">
          Shop
        </motion.h1>
        <button
          className="relative h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          onClick={() => setShowCart(true)}
          aria-label="Open cart"
        >
          <ShoppingCart className="h-4 w-4 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 rounded-full bg-accent-gold text-[10px] text-background flex items-center justify-center font-semibold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-accent-gold text-accent-gold-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {filtered.map((product) => (
          <motion.div
            key={product.name}
            variants={item}
            className="rounded-xl border border-border bg-card overflow-hidden group cursor-pointer hover:border-accent-gold/30 transition-colors"
            onClick={() => toast.info(`${product.name} · LKR ${product.price.toLocaleString()}`)}
          >
            <div className="h-32 bg-secondary relative">
              {product.aiPick && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-accent-gold text-background text-[10px] font-medium px-2 py-0.5 rounded-md">
                  <Sparkles className="h-3 w-3" /> AI Pick
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(product.name);
                }}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center"
                aria-label="Save product"
              >
                <Heart className={`h-3.5 w-3.5 ${saved.has(product.name) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
              </button>
            </div>
            <div className="p-2.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.brand}</p>
              <p className="font-medium text-sm mt-0.5 line-clamp-1">{product.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-sm">LKR {product.price.toLocaleString()}</span>
                <Button
                  size="sm"
                  className="h-7 px-2.5 rounded-lg text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CART DRAWER */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-card border-t border-x border-border rounded-t-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Cart ({cartCount})</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
                  aria-label="Close cart"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-10 text-center">
                  <ShoppingCart className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">Your cart is empty</p>
                  <Button variant="outline" className="mt-3 text-xs" onClick={() => setShowCart(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  {/* Items */}
                  <div className="space-y-2">
                    {cart.map((ci) => (
                      <div key={ci.name} className="rounded-xl border border-border bg-secondary/30 p-3 flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-secondary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{ci.name}</p>
                          <p className="text-xs text-muted-foreground">LKR {ci.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => updateQty(ci.name, -1)} className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center" aria-label="Decrease quantity">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">{ci.qty}</span>
                          <button onClick={() => updateQty(ci.name, 1)} className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center" aria-label="Increase quantity">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(ci.name)}
                          className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="rounded-xl border border-border bg-secondary/20 p-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Tag className="h-4 w-4 text-accent-gold" />
                      Coupon
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Try BUFF10" className="h-9" />
                      <Button variant="secondary" className="h-9" onClick={() => toast.info("Coupon applied if valid")}>
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && <p className="mt-2 text-xs text-muted-foreground">Discount: -LKR {discount.toLocaleString()}</p>}
                  </div>

                  {/* Payment */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Payment</div>
                    <div className="grid grid-cols-1 gap-2">
                      {paymentMethods.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedPayment(m.id)}
                          className={`rounded-xl border p-3 text-left transition-colors ${
                            selectedPayment === m.id ? "border-accent-gold/50 bg-accent-gold/10" : "border-border bg-secondary/20 hover:bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-background/60 border border-border flex items-center justify-center">
                              <m.icon className="h-4 w-4 text-accent-gold" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{m.label}</div>
                              <div className="text-xs text-muted-foreground">{m.desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="rounded-xl border border-border bg-secondary/20 p-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>LKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>- LKR {discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>LKR {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90" onClick={handleCheckout}>
                    Place Order
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
