"use client";

import { useState } from "react";
import { Star, MapPin, Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allSalons = [
  {
    name: "Luxe Hair Studio",
    location: "Downtown, NYC",
    rating: 4.9,
    reviews: 234,
    specialty: "Color & Highlights",
    price: "$$$$",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
  },
  {
    name: "Bella Vita Salon",
    location: "Brooklyn, NYC",
    rating: 4.8,
    reviews: 187,
    specialty: "Cuts & Styling",
    price: "$$$",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
  },
  {
    name: "The Style Bar",
    location: "Midtown, NYC",
    rating: 4.7,
    reviews: 312,
    specialty: "Bridal & Events",
    price: "$$$$",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop",
  },
  {
    name: "Curl & Co",
    location: "SoHo, NYC",
    rating: 4.9,
    reviews: 156,
    specialty: "Curly Hair",
    price: "$$$",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop",
  },
  {
    name: "Mane Attraction",
    location: "Chelsea, NYC",
    rating: 4.6,
    reviews: 289,
    specialty: "Extensions",
    price: "$$$$",
    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&h=400&fit=crop",
  },
  {
    name: "Shear Bliss",
    location: "Upper East, NYC",
    rating: 4.8,
    reviews: 198,
    specialty: "Blowouts",
    price: "$$",
    image:
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&h=400&fit=crop",
  },
];

const stylists = [
  {
    name: "Jessica Monroe",
    expertise: "Colorist",
    rating: 4.9,
    salon: "Luxe Hair Studio",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    name: "Alex Rivera",
    expertise: "Curly Specialist",
    rating: 4.8,
    salon: "Curl & Co",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    name: "Sophie Chen",
    expertise: "Bridal Stylist",
    rating: 4.9,
    salon: "The Style Bar",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    available: false,
  },
  {
    name: "Marcus Taylor",
    expertise: "Cut Specialist",
    rating: 4.7,
    salon: "Bella Vita",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
];

export default function SalonsPage() {
  const [tab, setTab] = useState<"salons" | "stylists">("salons");
  const [search, setSearch] = useState("");
  const [bookingModal, setBookingModal] = useState<string | null>(null);

  // booking form state
  const [service, setService] = useState("Haircut & Styling");
  const [date, setDate] = useState(""); // YYYY-MM-DD from <input type="date" />
  const [time, setTime] = useState<string | null>(null);

  const openBooking = (name: string) => {
    setService("Haircut & Styling");
    setDate("");
    setTime(null);
    setBookingModal(name);
  };

  const filteredSalons = allSalons.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Find Your Perfect Salon
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Book appointments at the best salons and stylists near you.
            </p>
          </motion.div>

          {/* Search + Tabs */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search salons, services, or stylists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full bg-card border border-border/50 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                aria-label="Filter"
              >
                <Filter className="w-4 h-4 text-secondary-foreground" />
              </button>
            </div>

            <div className="flex gap-2 justify-center">
              {(["salons", "stylists"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    tab === t
                      ? "gradient-primary text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t === "salons" ? "Salons" : "Stylists"}
                </button>
              ))}
            </div>
          </div>

          {/* Salon Grid */}
          {tab === "salons" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredSalons.map((salon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                      <span className="text-sm font-body font-semibold text-foreground">
                        {salon.rating}
                      </span>
                    </div>

                    <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-body font-semibold text-foreground">
                        {salon.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-display font-bold text-foreground mb-1">
                      {salon.name}
                    </h3>

                    <div className="flex items-center gap-1 text-muted-foreground text-sm font-body mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{salon.location}</span>
                      <span className="mx-1">·</span>
                      <span>{salon.reviews} reviews</span>
                    </div>

                    <span className="inline-block bg-secondary text-secondary-foreground text-xs font-body font-medium px-3 py-1 rounded-full mb-4">
                      {salon.specialty}
                    </span>

                    <Button
                      type="button"
                      variant="hero"
                      size="sm"
                      className="w-full rounded-full"
                      onClick={() => openBooking(salon.name)}
                    >
                      <Calendar className="w-4 h-4 mr-1" /> Book Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stylists List */}
          {tab === "stylists" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {stylists.map((stylist, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-5 p-5 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {stylist.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        <span className="text-sm font-body font-semibold">
                          {stylist.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-body text-muted-foreground mb-1">
                      {stylist.expertise} · {stylist.salon}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`text-xs font-body font-medium px-3 py-1 rounded-full ${
                          stylist.available
                            ? "bg-green-100 text-green-700"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {stylist.available
                          ? "Available Today"
                          : "Next Available: Tomorrow"}
                      </span>

                      <Button
                        type="button"
                        variant="hero"
                        size="sm"
                        className="rounded-full text-xs px-4"
                        onClick={() => openBooking(stylist.salon)}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Booking Modal */}
          {bookingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6 pointer-events-auto"
              onClick={() => setBookingModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card/95 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border/50 pointer-events-auto relative z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Book at {bookingModal}
                </h3>

                <p className="text-muted-foreground font-body text-sm mb-6">
                  Select your preferred date and time.
                </p>

                <div className="space-y-4">
                  {/* Service */}
                  <div>
                    <label className="text-sm font-body font-medium text-foreground mb-1 block">
                      Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option>Haircut & Styling</option>
                      <option>Color & Highlights</option>
                      <option>Blowout</option>
                      <option>Treatment</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-sm font-body font-medium text-foreground mb-1 block">
                      Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      min="2024-01-01"
                      max="2035-12-31"
                      onChange={(e) => {
                        const selected = e.target.value;
                        if (selected.length <= 10) {
                          setDate(selected);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key.length === 1 && !/[0-9-]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="text-sm font-body font-medium text-foreground mb-1 block">
                      Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "9:00 AM",
                        "10:30 AM",
                        "12:00 PM",
                        "2:00 PM",
                        "3:30 PM",
                        "5:00 PM",
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`pointer-events-auto px-3 py-2 rounded-lg text-xs font-body font-semibold transition-all duration-200 select-none
                            ${
                            time === t
                              ? "gradient-primary text-primary-foreground ring-2 ring-primary/40 shadow-lg scale-[1.03]"
                              : "bg-secondary text-secondary-foreground hover:gradient-primary hover:text-primary-foreground hover:shadow-md"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button
                    type="button"
                    variant="hero-outline"
                    className="flex-1 rounded-full"
                    onClick={() => setBookingModal(null)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="hero"
                    className="flex-1 rounded-full"
                    disabled={!date || !time}
                    onClick={() => setBookingModal(null)}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
