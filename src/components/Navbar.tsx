"use client";

import {
  Sparkles,
  Menu,
  X,
  ShoppingBag,
  User,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Salons", path: "/salons" },
  { label: "Products", path: "/products" },
  { label: "Pricing", path: "/pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn } = useAuth();
  const { items, count, total, inc, dec, remove } = useCart();

  const goCheckout = () => {
    setCartOpen(false);
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between h-18 px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground tracking-wide">
            Lily
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-body text-sm font-medium pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative py-1 transition-colors duration-300 ${
                pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  style={{ pointerEvents: "none" }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/products"
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="Products"
          >
            <ShoppingBag className="w-5 h-5 text-muted-foreground" />
          </Link>

          {/* Cart icon */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center leading-none">
                {count}
              </span>
            )}
          </button>

          <Link
            href="/login"
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="Login"
          >
            <User className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            href="/login"
            className="hidden sm:block gradient-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            type="button"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border/40 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 font-body text-sm font-medium transition-colors ${
                    pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setCartOpen(true);
                }}
                className="flex items-center justify-between w-full py-2 font-body text-sm font-medium text-muted-foreground"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </span>
                {count > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center leading-none">
                    {count}
                  </span>
                )}
              </button>

              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block gradient-primary text-primary-foreground text-center px-6 py-2.5 rounded-full text-sm font-semibold mt-3"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-[380px] max-w-[92vw] bg-black/40 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />

            {/* Drawer: guaranteed visible */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed right-6 top-24 z-[70] w-[340px] max-w-[92vw] h-[60vh] bg-white text-black shadow-2xl flex flex-col rounded-3xl border border-gray-200 overflow-hidden"
            >  
              {/* Top spacing so it doesn’t hide under navbar */}
              <div className="h-6" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-display font-bold text-black">Cart</h3>
                  <p className="text-sm font-body text-gray-600">
                    {count > 0 ? `${count} item(s)` : "Your cart is empty"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-14">
                    <p className="text-gray-600 font-body mb-5">
                      Add items from Products to see them here.
                    </p>
                    <Button
                      variant="hero"
                      className="rounded-full px-8"
                      onClick={() => {
                        setCartOpen(false);
                        router.push("/products");
                      }}
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center p-4 rounded-2xl bg-gray-50 border border-gray-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="font-body font-medium text-black text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-sm font-body text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                          <button
                            type="button"
                            onClick={() => dec(item.id)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="text-sm font-body font-semibold w-6 text-center text-black">
                            {item.qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => inc(item.id)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="ml-auto w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body font-medium text-gray-700">Total</span>
                    <span className="font-body font-bold text-black text-lg">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    variant="hero"
                    className="w-full rounded-full py-6 text-base"
                    onClick={goCheckout}
                  >
                    Checkout
                  </Button>

                  {!isLoggedIn && (
                    <p className="text-xs text-gray-600 font-body mt-3 text-center">
                      You must login before checkout.
                    </p>
                  )}
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
