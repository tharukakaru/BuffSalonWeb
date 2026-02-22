"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic features",
    features: [
      "Browse salons",
      "View ratings & reviews",
      "Basic product browsing",
      "Limited bookings (3/month)",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Unlock the full experience",
    features: [
      "Unlimited salon bookings",
      "Priority scheduling",
      "Exclusive product deals",
      "Saved favorites & history",
      "Stylist direct messaging",
    ],
    cta: "Subscribe to Pro",
    popular: true,
  },
  {
    name: "Elite",
    price: "$19.99",
    period: "/month",
    description: "Premium access to everything",
    features: [
      "Everything in Pro",
      "VIP salon access",
      "Personal style consultant",
      "Free shipping on products",
      "Early access to new features",
      "Premium support",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Simple Pricing
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Choose the plan that fits your beauty lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-foreground text-background shadow-2xl scale-[1.02]"
                    : "bg-card border border-border/50 hover:shadow-xl hover:border-primary/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-primary text-primary-foreground text-xs font-body font-semibold px-5 py-1.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <h3 className="text-xl font-display font-bold mb-1">
                  {plan.name}
                </h3>
                <p
                  className={`text-sm font-body mb-6 ${
                    plan.popular
                      ? "text-background/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="text-4xl font-display font-bold">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-body ${
                      plan.popular
                        ? "text-background/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular ? "bg-primary" : "bg-primary/10"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.popular
                              ? "text-primary-foreground"
                              : "text-primary"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm font-body ${
                          plan.popular
                            ? "text-background/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.popular ? "hero" : "hero-outline"}
                  className="w-full rounded-full py-6"
                >
                  <Link href="/login">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
