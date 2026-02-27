"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Scissors,
  Sparkles,
  Bot,
  Star,
  ArrowRight,
  CheckCircle2,
  Users,
  CalendarCheck,
  ShoppingBag,
  Palette,
  Crown,
  Flower2,
  SprayCan,
  ChevronRight,
  Eye,
  Smartphone,
  Zap,
  Shield,
  Clock,
  MapPin,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "For Professionals", href: "#professionals" },
];

const features = [
  {
    icon: Eye,
    title: "AI Virtual Try-On",
    desc: "See any hairstyle on yourself before committing. Powered by advanced AI.",
    gradient: "from-accent-gold/20 to-accent-gold/5",
  },
  {
    icon: Bot,
    title: "AI Beauty Agent",
    desc: "Your personal beauty manager. Get recommendations, plan events & more.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: CalendarCheck,
    title: "Smart Booking",
    desc: "Book salons, home visits or event stylists. Multi-service selection in one tap.",
    gradient: "from-accent-gold/15 to-accent-gold/5",
  },
  {
    icon: ShoppingBag,
    title: "Beauty Shop",
    desc: "Curated products from top vendors. Order tracking & doorstep delivery.",
    gradient: "from-accent/15 to-accent/5",
  },
  {
    icon: MapPin,
    title: "Find Nearby Salons",
    desc: "Discover top-rated salons and stylists in your area with real reviews.",
    gradient: "from-accent-gold/20 to-accent-gold/5",
  },
  {
    icon: Crown,
    title: "Bridal & Events",
    desc: "Complete wedding & event styling. Multi-person packages with dedicated teams.",
    gradient: "from-accent/20 to-accent/5",
  },
];

const howItWorks = [
  { step: "01", title: "Choose a Style", desc: "Browse trending styles or use AI to find your perfect look", icon: Sparkles },
  { step: "02", title: "Try It On", desc: "See the style on yourself with our AI virtual try-on", icon: Eye },
  { step: "03", title: "Book & Go", desc: "Book your stylist, pick a time, and get pampered", icon: CalendarCheck },
];

const testimonials = [
  { name: "Amara K.", role: "Bridal Client", text: "The AI try-on saved me hours of stress before my wedding. I found the perfect bridal look!", avatar: "AK" },
  { name: "Ravi S.", role: "Regular Customer", text: "I book all my grooming sessions through BUFF. The home visit feature is a game changer.", avatar: "RS" },
  { name: "Lena M.", role: "Salon Owner", text: "Since joining BUFF, my bookings increased by 60%. The dashboard is incredibly powerful.", avatar: "LM" },
  { name: "Jade T.", role: "Solo Stylist", text: "Managing my schedule and clients was never this easy. Love the portfolio feature!", avatar: "JT" },
  { name: "Nina P.", role: "Event Planner", text: "Coordinating stylists for weddings is seamless. The multi-person booking is brilliant.", avatar: "NP" },
  { name: "Saman W.", role: "Vendor", text: "Sales went up 40% after listing on BUFF. The analytics help me stock the right products.", avatar: "SW" },
];

const stats = [
  { value: "25,000+", label: "Active Users" },
  { value: "500+", label: "Partner Salons" },
  { value: "1,200+", label: "Stylists" },
  { value: "4.9★", label: "App Rating" },
];

const dashboardServices = [
  { name: "Haircut & Style", icon: Scissors, price: "LKR 1,500", popular: true },
  { name: "Hair Coloring", icon: Palette, price: "LKR 4,500", popular: false },
  { name: "Bridal Package", icon: Crown, price: "LKR 15,000", popular: true },
  { name: "Spa Treatment", icon: Flower2, price: "LKR 3,500", popular: false },
];

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center">
              <Scissors className="h-4.5 w-4.5 text-background" strokeWidth={2} />
            </div>
            <span className="font-bold text-lg tracking-tight">BUFF SALON</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" onClick={() => router.push("/login")} className="text-sm">
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90 text-sm"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground py-1.5"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => router.push("/login")} className="flex-1 text-sm">
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="flex-1 bg-accent-gold text-accent-gold-foreground text-sm"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent-gold/[0.07] blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] text-accent-gold/20 hidden md:block"
        >
          <Sparkles className="h-10 w-10" />
        </motion.div>

        <motion.div
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[10%] text-accent-gold/15 hidden md:block"
        >
          <Scissors className="h-8 w-8" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-[25%] right-[25%] text-accent/20 hidden md:block"
        >
          <Crown className="h-7 w-7" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold/60 flex items-center justify-center shadow-2xl shadow-accent-gold/25">
              <Scissors className="h-8 w-8 md:h-10 md:w-10 text-background" strokeWidth={1.8} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            AI-Powered Beauty
            <span className="block bg-gradient-to-r from-accent-gold via-accent to-accent-gold bg-clip-text text-transparent">
              Booking & Shopping
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Try hairstyles with AI, book salons or home visits instantly, and shop curated beauty products — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={() => router.push("/login")}
              className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Features <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm px-4 py-4">
                <div className="text-xl md:text-2xl font-bold">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
              Everything you need, beautifully unified
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Premium features that feel magical</h2>
            <p className="mt-3 text-muted-foreground">
              From AI try-ons to smart bookings and a curated marketplace — BUFF is built to make beauty effortless.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={item}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (f.title === "Beauty Shop") router.push("/shop");
                  if (f.title === "Find Nearby Salons") router.push("/salons");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (f.title === "Beauty Shop") router.push("/shop");
                    if (f.title === "Find Nearby Salons") router.push("/salons");
                  }
                }}
                className={`relative rounded-2xl border border-border/50 bg-gradient-to-br ${f.gradient} p-6 overflow-hidden cursor-pointer hover:border-accent-gold/40 transition-colors`}
              >
                <div className="absolute inset-0 bg-card/30 backdrop-blur-[2px]" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-background/60 border border-border/50 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-accent-gold" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to your next glow-up.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorks.map((h) => (
              <div key={h.step} className="rounded-2xl border border-border/50 bg-card/40 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-accent-gold">{h.step}</div>
                  <h.icon className="h-5 w-5 text-accent-gold" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by customers & pros</h2>
            <p className="mt-3 text-muted-foreground">Real stories from BUFF users across the platform.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border/50 bg-card/40 p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent-gold/20 border border-border/40 flex items-center justify-center font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground leading-relaxed">“{t.text}”</div>
                <div className="mt-4 flex gap-1 text-accent-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONALS */}
      <section id="professionals" className="py-20 md:py-28 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-accent-gold" />
                For salons, stylists & vendors
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Grow your business on BUFF
              </h2>
              <p className="mt-3 text-muted-foreground">
                Accept bookings, manage schedules, showcase portfolios, and sell products — with analytics and automation.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { icon: Zap, text: "Automated booking & schedule management" },
                  { icon: Shield, text: "Verified reviews & trusted profiles" },
                  { icon: Smartphone, text: "Mobile-first tools for pros" },
                  { icon: Clock, text: "Faster payouts & order tracking" },
                ].map((p) => (
                  <div key={p.text} className="flex items-start gap-3">
                    <div className="mt-0.5 h-9 w-9 rounded-xl bg-accent-gold/15 border border-border/40 flex items-center justify-center">
                      <p.icon className="h-4 w-4 text-accent-gold" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">{p.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
                >
                  Join as a Professional <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => router.push("/login")}>
                  View Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border/50 bg-card/40 p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">Dashboard Preview</div>
                <div className="text-xs text-muted-foreground">Services</div>
              </div>

              <div className="mt-5 space-y-3">
                {dashboardServices.map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/40 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-accent-gold/15 border border-border/40 flex items-center justify-center">
                        <s.icon className="h-4 w-4 text-accent-gold" />
                      </div>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.price}</div>
                      </div>
                    </div>
                    {s.popular ? (
                      <div className="inline-flex items-center gap-1 text-xs rounded-full bg-accent-gold/15 text-accent-gold px-2 py-1 border border-border/40">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Popular
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">Available</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border/40 bg-background/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Today’s Highlights</div>
                  <div className="text-xs text-muted-foreground">Live</div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/40 bg-card/40 px-3 py-3">
                    <div className="text-xs text-muted-foreground">Bookings</div>
                    <div className="mt-1 text-lg font-bold">18</div>
                  </div>
                  <div className="rounded-xl border border-border/40 bg-card/40 px-3 py-3">
                    <div className="text-xs text-muted-foreground">Revenue</div>
                    <div className="mt-1 text-lg font-bold">LKR 62k</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center">
              <Scissors className="h-4.5 w-4.5 text-background" strokeWidth={2} />
            </div>
            <div>
              <div className="font-bold tracking-tight">BUFF SALON</div>
              <div className="text-xs text-muted-foreground">AI beauty booking & commerce</div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BUFF SALON. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
