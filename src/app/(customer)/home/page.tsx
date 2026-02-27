"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  UserRound,
  ShoppingBag,
  Bot,
  Scissors,
  Palette,
  Crown,
  Flower2,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  Mic,
  Paperclip,
  ArrowRight,
  ChevronDown,
  Compass,
} from "lucide-react";
import { useRouter } from "next/navigation";

const heroWords = ["styles", "looks", "confidence", "beauty", "glamour"];

const featureCards = [
  { icon: Scissors, label: "Book Stylist", desc: "Home or salon", path: "/explore" },
  { icon: Bot, label: "AI Agent", desc: "Beauty manager", path: "/agent" },
  { icon: Sparkles, label: "AI Try-On", desc: "Virtual styling", path: "/try-on" },
  { icon: Compass, label: "Explore Salons", desc: "Near you", path: "/explore" },
  { icon: ShoppingBag, label: "Shop Products", desc: "Curated picks", path: "/shop" },
  { icon: Calendar, label: "My Bookings", desc: "Manage schedule", path: "/bookings" },
  { icon: Crown, label: "Bridal", desc: "Wedding packages", path: "/events/wedding" },
  { icon: Palette, label: "Hair Color", desc: "Explore shades", path: "/explore" },
  { icon: UserRound, label: "Solo Stylists", desc: "Find experts", path: "/stylists" },
  { icon: TrendingUp, label: "Trending", desc: "Popular styles", path: "/try-on" },
  { icon: ImageIcon, label: "Portfolio", desc: "Style gallery", path: "/try-on" },
  { icon: Flower2, label: "Spa & Care", desc: "Treatments", path: "/explore" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HomePage() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent-gold/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-gold/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-4 py-8 md:px-12 md:py-16 max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-10 md:mb-14">
          <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Create{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-accent-gold"
                >
                  {heroWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="text-accent-gold animate-pulse">_</span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground">
            with <span className="font-semibold text-foreground">✨ Buff Salon</span>
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            variants={item}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-1.5 flex items-center gap-2 hover:border-accent-gold/30 transition-colors"
          >
            <div className="pl-3">
              <Sparkles className="h-5 w-5 text-accent-gold/60" />
            </div>

            <input
              type="text"
              placeholder="What do you want to create today?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-3 px-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") router.push("/agent");
              }}
            />

            <div className="flex items-center gap-1.5 pr-1">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/60">
                <Paperclip className="h-4 w-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/60">
                <Mic className="h-4 w-4" />
              </button>
              <button
                onClick={() => router.push("/agent")}
                className="flex items-center gap-1.5 bg-accent-gold text-accent-gold-foreground rounded-xl px-4 py-2 text-sm font-medium hover:bg-accent-gold/90 transition-colors"
              >
                Go <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {featureCards.map((card) => (
            <motion.button
              key={card.label}
              variants={item}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(card.path)}
              className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 flex flex-col items-center gap-3 hover:border-accent-gold/30 hover:bg-card/80 transition-all group"
            >
              <div className="h-11 w-11 rounded-xl bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/15 transition-colors">
                <card.icon className="h-5 w-5 text-accent-gold" strokeWidth={1.6} />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{card.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{card.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-10 w-10 rounded-full border border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent-gold/30 transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
