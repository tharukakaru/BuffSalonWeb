"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  BadgeCheck,
  MapPin,
  Home as HomeIcon,
  Filter,
  Search,
  ChevronLeft,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Stylist = {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviews: number;
  fee: string;
  verified: boolean;
  homeVisit: boolean;
  location: string;
  bio: string;
  tags: string[];
};

const stylists: Stylist[] = [
  {
    id: "s1",
    name: "Amara K.",
    avatar: "AK",
    specialty: "Bridal Specialist",
    rating: 4.9,
    reviews: 67,
    fee: "LKR 3,500/visit",
    verified: true,
    homeVisit: true,
    location: "Colombo 03",
    bio: "Bridal hair + makeup, long-lasting looks, and event styling. 8+ years experience.",
    tags: ["Bridal", "Updo", "Makeup"],
  },
  {
    id: "s2",
    name: "Lena M.",
    avatar: "LM",
    specialty: "Color Expert",
    rating: 4.8,
    reviews: 45,
    fee: "LKR 3,000/visit",
    verified: true,
    homeVisit: true,
    location: "Colombo 05",
    bio: "Color correction, highlights, balayage, and healthy hair routines.",
    tags: ["Color", "Balayage", "Treatment"],
  },
  {
    id: "s3",
    name: "Jade T.",
    avatar: "JT",
    specialty: "Natural Hair",
    rating: 4.7,
    reviews: 52,
    fee: "LKR 2,800/visit",
    verified: false,
    homeVisit: true,
    location: "Colombo 04",
    bio: "Natural styling, curls, braids, and protective styles.",
    tags: ["Natural", "Curls", "Braids"],
  },
  {
    id: "s4",
    name: "Ravi S.",
    avatar: "RS",
    specialty: "Men’s Grooming",
    rating: 4.6,
    reviews: 39,
    fee: "LKR 2,500/visit",
    verified: true,
    homeVisit: false,
    location: "Colombo 02",
    bio: "Precision cuts, beard shaping, and formal looks for events.",
    tags: ["Men", "Fade", "Beard"],
  },
];

const filters = ["All", "Verified", "Home Visit", "Top Rated", "Bridal", "Color", "Natural"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function StylistsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Stylist | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return stylists.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.specialty.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Verified" && s.verified) ||
        (activeFilter === "Home Visit" && s.homeVisit) ||
        (activeFilter === "Top Rated" && s.rating >= 4.8) ||
        s.tags.map((t) => t.toLowerCase()).includes(activeFilter.toLowerCase());

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5">
      <AnimatePresence>
        {selected ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 pb-24"
          >
            {/* Header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelected(null)}
                className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">Stylist</h1>
                <p className="text-xs text-muted-foreground">Profile & booking</p>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-accent-gold text-background flex items-center justify-center font-bold">
                  {selected.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold truncate">{selected.name}</h2>
                    {selected.verified && <BadgeCheck className="h-5 w-5 text-accent-gold" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{selected.specialty}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                      {selected.rating} ({selected.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {selected.location}
                    </span>
                    {selected.homeVisit && (
                      <span className="flex items-center gap-1">
                        <HomeIcon className="h-3 w-3" /> Home visit
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">{selected.bio}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-[11px] font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-secondary/30 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Service fee</p>
                  <p className="text-sm font-semibold">{selected.fee}</p>
                </div>
                <Button
                  className="h-10"
                  onClick={() => {
                    // simple frontend-only jump to checkout
                    window.sessionStorage.setItem(
                      "bookingDraft",
                      JSON.stringify({
                        salon: "Solo Stylist",
                        stylist: selected.name,
                        services: [{ name: selected.specialty, price: 3500, duration: "60 min" }],
                      })
                    );
                    router.push("/booking/checkout");
                    toast.success(`Booking ${selected.name}`);
                  }}
                >
                  <CalendarDays className="h-4 w-4 mr-2" /> Book
                </Button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-10"
                  onClick={() => {
                    router.push("/agent");
                    toast.info(`Ask AI about ${selected.name}`);
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" /> Ask AI
                </Button>
                <Button
                  variant="outline"
                  className="h-10"
                  onClick={() => toast.info("Portfolio/gallery will be added later")}
                >
                  View portfolio
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold">Stylists</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Find solo stylists for home visits or salon appointments.
                </p>
              </div>

              <Button variant="outline" className="h-10" onClick={() => toast.info("More filters coming soon")}>
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
                placeholder="Search by name, specialty, tag..."
                className="flex-1 bg-transparent text-sm outline-none px-2 py-2"
              />
            </div>

            {/* Filters row */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeFilter === f
                      ? "bg-accent-gold text-accent-gold-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* List */}
            <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((s) => (
                <motion.button
                  key={s.id}
                  variants={item}
                  onClick={() => setSelected(s)}
                  className="text-left rounded-2xl border border-border bg-card p-4 hover:border-accent-gold/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-accent-gold text-background flex items-center justify-center font-bold">
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{s.name}</p>
                        {s.verified && <BadgeCheck className="h-4 w-4 text-accent-gold" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{s.specialty}</p>

                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                          {s.rating} ({s.reviews})
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {s.location}
                        </span>
                        {s.homeVisit && (
                          <span className="flex items-center gap-1">
                            <HomeIcon className="h-3 w-3" /> Home visit
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-accent-gold/10 text-accent-gold text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-muted-foreground">Fee</p>
                      <p className="text-sm font-semibold">{s.fee}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground">Tap to view</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
                No stylists found. Try another filter or search term.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
