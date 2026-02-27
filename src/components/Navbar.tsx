"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scissors, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Salons", path: "/salons" },
  { label: "Shop", path: "/shop" },
  { label: "Products", path: "/products" },
  { label: "Pricing", path: "/pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center"> 
            <Scissors className="h-4.5 w-4.5 text-background" strokeWidth={2} />
          </div>
          <span className="font-bold text-lg tracking-tight">BUFF SALON</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-accent-gold"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.push("/shop")}
            aria-label="Open shop"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop
          </Button>

          {isLoggedIn ? (
            <Button variant="outline" onClick={() => router.push("/dashboard")} className="gap-2">
              <User className="h-4 w-4" />
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          type="button"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm py-1.5 ${
                  pathname === link.path ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 flex gap-2">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setMobileOpen(false);
                      router.push("/login");
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="flex-1 bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
                    onClick={() => {
                      setMobileOpen(false);
                      router.push("/register");
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
