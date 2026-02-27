"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  subtitle: string;
  highlight?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "Free",
    subtitle: "For browsing & basic booking",
    icon: Sparkles,
    features: [
      "Browse salons & services",
      "Basic booking flow",
      "Customer profile",
      "Email notifications",
    ],
  },
  {
    name: "Pro",
    price: "LKR 2,990/mo",
    subtitle: "Best for frequent customers",
    highlight: true,
    icon: Zap,
    features: [
      "Priority booking slots",
      "AI recommendations",
      "Exclusive deals in Shop",
      "Faster support response",
      "Saved styles & history",
    ],
  },
  {
    name: "Business",
    price: "LKR 9,990/mo",
    subtitle: "For salons & professionals",
    icon: Crown,
    features: [
      "Salon dashboard access",
      "Service & staff management",
      "Booking analytics",
      "Promoted listing",
      "Order management tools",
    ],
  },
];

const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-14">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
              Flexible plans for customers & pros
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Pricing that grows with you
            </h1>
            <p className="mt-3 text-muted-foreground">
              Choose a plan that fits your beauty routine — or your salon business.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((p) => (
              <motion.div
                key={p.name}
                variants={item}
                initial="hidden"
                animate="show"
                className={[
                  "rounded-2xl border bg-card/50 p-6 relative overflow-hidden",
                  p.highlight ? "border-accent-gold/50" : "border-border",
                ].join(" ")}
              >
                {p.highlight && (
                  <div className="absolute top-4 right-4 text-[11px] font-medium rounded-full px-2 py-1 border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent-gold/15 border border-border/40 flex items-center justify-center">
                    <p.icon className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.subtitle}</div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-3xl font-bold">{p.price}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Cancel anytime. No hidden fees.
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent-gold mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={[
                    "mt-6 w-full",
                    p.highlight
                      ? "bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
                      : "variant-outline",
                  ].join(" ")}
                  variant={p.highlight ? "default" : "outline"}
                  onClick={() => {
                    // frontend only – later connect to payment/upgrade
                    alert(`Selected: ${p.name}`);
                  }}
                >
                  Choose {p.name}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-muted-foreground">
            Note: This is UI-only for now. Backend subscription logic can be wired later.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
