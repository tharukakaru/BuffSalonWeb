"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Search, Filter, Scissors, CalendarCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type Salon = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  tags: string[];
  priceFrom: string;
};

const SALONS: Salon[] = [
  {
    id: 1,
    name: "BUFF Signature Studio",
    location: "Colombo 07",
    rating: 4.9,
    reviews: 312,
    tags: ["Hair", "Bridal", "Color"],
    priceFrom: "LKR 2,500",
  },
  {
    id: 2,
    name: "Glow & Go Salon",
    location: "Kandy",
    rating: 4.7,
    reviews: 198,
    tags: ["Hair", "Spa", "Nails"],
    priceFrom: "LKR 1,800",
  },
  {
    id: 3,
    name: "Luxe Locks Lounge",
    location: "Galle",
    rating: 4.8,
    reviews: 145,
    tags: ["Bridal", "Makeup", "Events"],
    priceFrom: "LKR 3,200",
  },
  {
    id: 4,
    name: "Urban Groom Bar",
    location: "Colombo 05",
    rating: 4.6,
    reviews: 221,
    tags: ["Grooming", "Beard", "Hair"],
    priceFrom: "LKR 1,500",
  },
  {
    id: 5,
    name: "Serenity Beauty House",
    location: "Negombo",
    rating: 4.5,
    reviews: 103,
    tags: ["Skin", "Spa", "Hair"],
    priceFrom: "LKR 2,000",
  },
  {
    id: 6,
    name: "Bridal Crown Atelier",
    location: "Colombo 03",
    rating: 4.9,
    reviews: 88,
    tags: ["Bridal", "Luxury", "Makeup"],
    priceFrom: "LKR 8,500",
  },
];

const locations = ["All", "Colombo", "Kandy", "Galle", "Negombo"];
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function SalonsPage() {
  const [query, setQuery] = useState("");
  const [onlyTopRated, setOnlyTopRated] = useState(false);
  const [location, setLocation] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SALONS.filter((s) => {
      const matchesQuery =
        q.length === 0
          ? true
          : `${s.name} ${s.location} ${s.tags.join(" ")} ${s.priceFrom}`.toLowerCase().includes(q);

      const matchesTop = onlyTopRated ? s.rating >= 4.8 : true;

      const matchesLocation =
        location === "All"
          ? true
          : s.location.toLowerCase().includes(location.toLowerCase());

      return matchesQuery && matchesTop && matchesLocation;
    });
  }, [query, onlyTopRated, location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-14">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent-gold/15 border border-border/40 flex items-center justify-center">
                    <Scissors className="h-5 w-5 text-accent-gold" />
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight">Find Nearby Salons</h1>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discover top-rated salons and stylists. Filter by location and ratings.
                </p>
              </div>

              <Button className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90 gap-2">
                <CalendarCheck className="h-4 w-4" />
                Book Now
              </Button>
            </div>

            {/* Controls */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search salons, tags, location..."
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setOnlyTopRated((v) => !v)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors ${
                  onlyTopRated
                    ? "border-accent-gold/50 text-accent-gold bg-accent-gold/10"
                    : "border-border text-muted-foreground bg-background/40 hover:bg-muted/20 hover:text-foreground"
                }`}
              >
                <Filter className="h-4 w-4" />
                Top rated (4.8+)
              </button>
            </div>
          </div>

          {/* Salon cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => (
              <motion.div
                key={s.id}
                variants={item}
                initial="hidden"
                animate="show"
                className="rounded-2xl border border-border bg-card/50 overflow-hidden hover:bg-muted/10 transition-colors"
              >
                <div className="h-28 bg-secondary/40" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{s.name}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {s.location}
                      </div>
                    </div>

                    <div className="shrink-0 inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-1 text-xs">
                      <Star className="h-3.5 w-3.5 text-accent-gold fill-accent-gold" />
                      {s.rating}
                      <span className="text-muted-foreground">({s.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] rounded-full border border-border/60 bg-background/40 px-2 py-1 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">From </span>
                      <span className="font-semibold">{s.priceFrom}</span>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-10">
              No salons found. Try a different search.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
