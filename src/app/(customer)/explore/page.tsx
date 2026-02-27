"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Filter,
  List,
  Map,
  BadgeCheck,
  Home as HomeIcon,
  X,
  Clock,
  Phone,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  Heart,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Salon = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  services: { name: string; price: string; duration: string }[];
  phone: string;
  hours: string;
  address: string;
  stylists: { name: string; avatar: string; specialty: string; rating: number }[];
  reviewList: { user: string; rating: number; comment: string; date: string }[];
};

const salons: Salon[] = [
  {
    id: "1",
    name: "Luxe Hair Studio",
    rating: 4.9,
    reviews: 128,
    distance: "0.8 km",
    price: "$$",
    services: [
      { name: "Haircut", price: "LKR 2,500", duration: "45 min" },
      { name: "Hair Color", price: "LKR 5,000", duration: "90 min" },
      { name: "Bridal Package", price: "LKR 15,000", duration: "3 hrs" },
      { name: "Keratin Treatment", price: "LKR 8,000", duration: "2 hrs" },
    ],
    phone: "+94 77 123 4567",
    hours: "9 AM – 8 PM",
    address: "42 Galle Road, Colombo 03",
    stylists: [
      { name: "Amara K.", avatar: "AK", specialty: "Bridal Specialist", rating: 4.9 },
      { name: "Nisha P.", avatar: "NP", specialty: "Color Expert", rating: 4.7 },
    ],
    reviewList: [
      { user: "Sarah M.", rating: 5, comment: "Absolutely love the bridal styling! Nisha was amazing.", date: "2 days ago" },
      { user: "Kavitha R.", rating: 5, comment: "Best salon in Colombo. Always leave feeling beautiful.", date: "1 week ago" },
      { user: "Dilini F.", rating: 4, comment: "Great service but had to wait 15 min past my slot.", date: "2 weeks ago" },
    ],
  },
  {
    id: "2",
    name: "The Curl Bar",
    rating: 4.7,
    reviews: 86,
    distance: "1.2 km",
    price: "$",
    services: [
      { name: "Curly Cut", price: "LKR 2,000", duration: "50 min" },
      { name: "Natural Styling", price: "LKR 1,500", duration: "40 min" },
      { name: "Braids", price: "LKR 3,500", duration: "90 min" },
    ],
    phone: "+94 71 987 6543",
    hours: "10 AM – 7 PM",
    address: "15 Duplication Road, Colombo 04",
    stylists: [{ name: "Jade T.", avatar: "JT", specialty: "Natural Hair", rating: 4.7 }],
    reviewList: [
      { user: "Tanya W.", rating: 5, comment: "Finally someone who understands curly hair!", date: "3 days ago" },
      { user: "Priya S.", rating: 4, comment: "Good braiding work. Friendly staff.", date: "1 week ago" },
    ],
  },
  {
    id: "3",
    name: "Velvet Salon & Spa",
    rating: 4.8,
    reviews: 204,
    distance: "2.1 km",
    price: "$$$",
    services: [
      { name: "Luxury Cut & Style", price: "LKR 4,000", duration: "60 min" },
      { name: "Bridal Makeup + Hair", price: "LKR 25,000", duration: "4 hrs" },
      { name: "Spa Treatment", price: "LKR 6,000", duration: "90 min" },
      { name: "Hair Botox", price: "LKR 12,000", duration: "2.5 hrs" },
    ],
    phone: "+94 76 555 1234",
    hours: "8 AM – 9 PM",
    address: "88 Havelock Road, Colombo 05",
    stylists: [
      { name: "Lena M.", avatar: "LM", specialty: "Color Expert", rating: 4.8 },
      { name: "Amara K.", avatar: "AK", specialty: "Bridal Specialist", rating: 4.9 },
      { name: "Ravi S.", avatar: "RS", specialty: "Men's Grooming", rating: 4.6 },
    ],
    reviewList: [
      { user: "Nadeesha J.", rating: 5, comment: "Premium experience. Worth every rupee!", date: "1 day ago" },
      { user: "Michelle D.", rating: 5, comment: "My bridal day was perfect thanks to their team.", date: "5 days ago" },
      { user: "Kasun P.", rating: 4, comment: "Great men's grooming section too.", date: "2 weeks ago" },
    ],
  },
];

const exploreStylists = [
  { name: "Amara K.", specialty: "Bridal Specialist", rating: 4.9, reviews: 67, fee: "LKR 3,500/visit", verified: true, homeVisit: true, avatar: "AK" },
  { name: "Lena M.", specialty: "Color Expert", rating: 4.8, reviews: 45, fee: "LKR 3,000/visit", verified: true, homeVisit: true, avatar: "LM" },
  { name: "Jade T.", specialty: "Natural Hair", rating: 4.7, reviews: 52, fee: "LKR 2,800/visit", verified: false, homeVisit: true, avatar: "JT" },
];

const filters = ["All", "Home Visit", "Wedding", "Under LKR 2K", "Top Rated", "Near Me"];

const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, "")) || 0;

const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

export default function ExplorePage() {
  const router = useRouter();

  const [view, setView] = useState<"list" | "map">("list");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [savedSalons, setSavedSalons] = useState<Set<string>>(new Set());

  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [showStylistModal, setShowStylistModal] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);

  const go = (path: string) => router.push(path);

  const toggleSave = (id: string) => {
    setSavedSalons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Removed from saved");
      } else {
        next.add(id);
        toast.success("Saved!");
      }
      return next;
    });
  };

  const toggleService = (name: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const selectedTotal = selectedSalon
    ? selectedSalon.services
        .filter((s) => selectedServices.has(s.name))
        .reduce((sum, s) => sum + parsePrice(s.price), 0)
    : 0;

  const handleBookSelected = () => setShowStylistModal(true);

  const handleContinueToCheckout = () => {
    if (!selectedSalon) return;

    const svcs = selectedSalon.services.filter((s) => selectedServices.has(s.name));
    const stylist = selectedSalon.stylists.find((s) => s.name === selectedStylist);

    // Next.js replacement for react-router "navigate(state)"
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "bookingDraft",
        JSON.stringify({
          salon: selectedSalon.name,
          services: svcs.map((s) => ({ name: s.name, price: parsePrice(s.price), duration: s.duration })),
          stylist: stylist ? stylist.name : "Best Match",
        })
      );
    }

    go("/booking/checkout");
    setShowStylistModal(false);
    setSelectedServices(new Set());
    setSelectedStylist(null);
  };

  const openSalonDetail = (salon: Salon) => {
    setSelectedSalon(salon);
    setSelectedServices(new Set());
    setSelectedStylist(null);
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5 relative">
      <AnimatePresence>
        {selectedSalon ? (
          /* ─── SALON DETAIL ─── */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 pb-24"
          >
            {/* Header image */}
            <div className="relative h-40 md:h-52 rounded-xl bg-secondary overflow-hidden">
              <button
                onClick={() => {
                  setSelectedSalon(null);
                  setSelectedServices(new Set());
                }}
                className="absolute top-3 left-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleSave(selectedSalon.id)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <Heart className={`h-4 w-4 ${savedSalons.has(selectedSalon.id) ? "fill-accent text-accent" : ""}`} />
              </button>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-xl font-bold">{selectedSalon.name}</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                  {selectedSalon.rating} ({selectedSalon.reviews})
                </span>
                <span>{selectedSalon.price}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {selectedSalon.distance}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {selectedSalon.address}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {selectedSalon.hours}
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                className="h-10 text-xs"
                onClick={() => {
                  if (selectedServices.size > 0) handleBookSelected();
                  else toast.info("Select services below to book");
                }}
              >
                Book Now
              </Button>
              <Button variant="outline" className="h-10 text-xs" onClick={() => toast.info(`Calling ${selectedSalon.phone}`)}>
                <Phone className="h-3.5 w-3.5 mr-1" /> Call
              </Button>
              <Button
                variant="outline"
                className="h-10 text-xs"
                onClick={() => {
                  go("/agent");
                  toast.info(`Ask agent about ${selectedSalon.name}`);
                }}
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Ask AI
              </Button>
            </div>

            {/* Services - Multi Select */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Services</h3>
                {selectedServices.size > 0 && <span className="text-xs text-accent-gold font-medium">{selectedServices.size} selected</span>}
              </div>
              <div className="space-y-1.5">
                {selectedSalon.services.map((s) => {
                  const isSelected = selectedServices.has(s.name);
                  return (
                    <div
                      key={s.name}
                      onClick={() => toggleService(s.name)}
                      className={`rounded-xl border p-3 flex items-center gap-3 cursor-pointer transition-all ${
                        isSelected ? "border-accent-gold bg-accent-gold/5" : "border-border bg-card hover:border-accent-gold/30"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? "bg-accent-gold border-accent-gold" : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-accent-gold-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.duration}</p>
                      </div>
                      <span className="text-sm font-semibold text-accent-gold">{s.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stylists */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Stylists</h3>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                {selectedSalon.stylists.map((st) => (
                  <div
                    key={st.name}
                    className="flex flex-col items-center gap-1.5 cursor-pointer min-w-[64px]"
                    onClick={() => toast.info(`${st.name} · ${st.specialty}`)}
                  >
                    <div className="h-12 w-12 rounded-full bg-accent-gold/15 flex items-center justify-center text-accent-gold text-xs font-semibold">
                      {st.avatar}
                    </div>
                    <p className="text-[11px] font-medium text-center">{st.name}</p>
                    <p className="text-[9px] text-muted-foreground text-center">{st.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Reviews</h3>
                <button className="text-xs text-accent-gold" onClick={() => toast.info("All reviews")}>
                  See all
                </button>
              </div>
              <div className="space-y-2">
                {selectedSalon.reviewList.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-3 cursor-pointer hover:border-accent-gold/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{r.user}</span>
                      <span className="text-[10px] text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-1">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 text-accent-gold fill-accent-gold" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <Button variant="outline" className="w-full h-10 text-xs" onClick={() => toast.info("Chat with salon")}>
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> Chat with {selectedSalon.name}
            </Button>

            {/* ─── FLOATING BOOKING BAR ─── */}
            <AnimatePresence>
              {selectedServices.size > 0 && !showStylistModal && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
                >
                  <div className="rounded-2xl bg-card border border-accent-gold/30 shadow-xl shadow-accent-gold/10 p-4 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {selectedServices.size} service{selectedServices.size > 1 ? "s" : ""} selected
                      </p>
                      <p className="text-xs text-accent-gold font-medium">LKR {selectedTotal.toLocaleString()}</p>
                    </div>
                    <Button onClick={() => setSelectedServices(new Set())} variant="ghost" size="sm" className="text-xs text-muted-foreground">
                      Clear
                    </Button>
                    <Button
                      onClick={handleBookSelected}
                      className="bg-gradient-to-r from-accent-gold to-accent-gold/85 text-background font-semibold shadow-lg shadow-accent-gold/15 px-5"
                    >
                      Book Now
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── STYLIST SELECTION MODAL ─── */}
            <AnimatePresence>
              {showStylistModal && selectedSalon && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end md:items-center justify-center"
                  onClick={() => setShowStylistModal(false)}
                >
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md bg-card border-t md:border border-border rounded-t-2xl md:rounded-2xl p-5 space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">Select Stylist</h3>
                      <button
                        onClick={() => setShowStylistModal(false)}
                        className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Selected services summary */}
                    <div className="rounded-xl border border-border bg-secondary/30 p-3 space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Selected Services</p>
                      {selectedSalon.services
                        .filter((s) => selectedServices.has(s.name))
                        .map((s) => (
                          <div key={s.name} className="flex justify-between text-xs">
                            <span>{s.name}</span>
                            <span className="text-accent-gold font-medium">{s.price}</span>
                          </div>
                        ))}
                      <div className="border-t border-border pt-1 mt-1 flex justify-between text-sm font-bold">
                        <span>Total</span>
                        <span className="text-accent-gold">LKR {selectedTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Stylist picker */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedStylist(null)}
                        className={`w-full rounded-xl border p-3 flex items-center gap-3 transition-all ${
                          selectedStylist === null ? "border-accent-gold bg-accent-gold/5" : "border-border hover:border-accent-gold/20"
                        }`}
                      >
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                            selectedStylist === null ? "bg-accent-gold text-accent-gold-foreground" : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          ?
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium">Best Match</p>
                          <p className="text-[11px] text-muted-foreground">We'll assign the best available stylist</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedStylist === null ? "border-accent-gold" : "border-border"}`}>
                          {selectedStylist === null && <div className="h-2.5 w-2.5 rounded-full bg-accent-gold" />}
                        </div>
                      </button>

                      {selectedSalon.stylists.map((st) => (
                        <button
                          key={st.name}
                          onClick={() => setSelectedStylist(st.name)}
                          className={`w-full rounded-xl border p-3 flex items-center gap-3 transition-all ${
                            selectedStylist === st.name ? "border-accent-gold bg-accent-gold/5" : "border-border hover:border-accent-gold/20"
                          }`}
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold ${
                              selectedStylist === st.name ? "bg-accent-gold text-accent-gold-foreground" : "bg-accent-gold/15 text-accent-gold"
                            }`}
                          >
                            {st.avatar}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium">{st.name}</p>
                            <p className="text-[11px] text-muted-foreground">{st.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
                            <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                            {st.rating}
                          </div>
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedStylist === st.name ? "border-accent-gold" : "border-border"}`}>
                            {selectedStylist === st.name && <div className="h-2.5 w-2.5 rounded-full bg-accent-gold" />}
                          </div>
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={handleContinueToCheckout}
                      className="w-full h-12 bg-gradient-to-r from-accent-gold to-accent-gold/85 text-background font-semibold text-sm shadow-lg shadow-accent-gold/15"
                    >
                      Continue to Checkout · LKR {selectedTotal.toLocaleString()}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ─── LIST VIEW ─── */
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-5">
              <motion.h1 variants={item} initial="hidden" animate="show" className="text-xl font-semibold">
                Salons Explore
              </motion.h1>
              <div className="flex gap-0.5 border border-border rounded-lg p-0.5">
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-accent-gold/15 text-accent-gold" : "text-muted-foreground"}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`p-1.5 rounded-md transition-colors ${view === "map" ? "bg-accent-gold/15 text-accent-gold" : "text-muted-foreground"}`}
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeFilter === f ? "bg-accent-gold text-accent-gold-foreground" : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {f}
                </button>
              ))}
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary flex items-center gap-1"
                onClick={() => toast.info("More filters")}
              >
                <Filter className="h-3 w-3" /> More
              </button>
            </div>

            <Tabs defaultValue="salons">
              <TabsList className="w-full bg-secondary rounded-lg h-9">
                <TabsTrigger value="salons" className="flex-1 rounded-md text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  Salons
                </TabsTrigger>
                <TabsTrigger
                  value="stylists"
                  className="flex-1 rounded-md text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  Solo Stylists
                </TabsTrigger>
              </TabsList>

              <TabsContent value="salons">
                {view === "map" && (
                  <motion.div
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="h-44 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground text-sm mb-4 cursor-pointer"
                    onClick={() => toast.info("Map view coming soon")}
                  >
                    <MapPin className="h-4 w-4 mr-2" /> Map View (Coming Soon)
                  </motion.div>
                )}

                <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-3">
                  {salons.map((salon) => (
                    <motion.div
                      key={salon.id}
                      variants={item}
                      className="rounded-xl border border-border bg-card overflow-hidden cursor-pointer hover:border-accent-gold/30 transition-colors"
                      onClick={() => openSalonDetail(salon)}
                    >
                      <div className="h-24 bg-secondary relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(salon.id);
                          }}
                          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Heart className={`h-3.5 w-3.5 ${savedSalons.has(salon.id) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                        </button>
                      </div>
                      <div className="p-3.5">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm">{salon.name}</h3>
                          <span className="text-xs text-muted-foreground">{salon.price}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                            {salon.rating} ({salon.reviews})
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {salon.distance}
                          </span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {salon.services.slice(0, 3).map((s) => (
                            <span key={s.name} className="px-2 py-0.5 rounded-md bg-accent-gold/10 text-accent-gold text-[10px] font-medium">
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="stylists">
                <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-2.5 mt-3">
                  {exploreStylists.map((stylist) => (
                    <motion.div
                      key={stylist.name}
                      variants={item}
                      className="rounded-xl border border-border bg-card p-3.5 flex items-start gap-3 cursor-pointer hover:border-accent-gold/30 transition-colors"
                      onClick={() => go("/stylists")}
                    >
                      <div className="h-10 w-10 rounded-full bg-accent-gold flex items-center justify-center text-accent-gold-foreground font-medium text-xs flex-shrink-0">
                        {stylist.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-medium text-sm">{stylist.name}</h3>
                          {stylist.verified && <BadgeCheck className="h-3.5 w-3.5 text-accent-gold" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{stylist.specialty}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent-gold fill-accent-gold" />
                            {stylist.rating}
                          </span>
                          <span>{stylist.fee}</span>
                          {stylist.homeVisit && (
                            <span className="flex items-center gap-1">
                              <HomeIcon className="h-3 w-3" />
                              Home visit
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="rounded-lg text-xs h-8 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          go("/booking/checkout");
                          toast.success(`Booking ${stylist.name}`);
                        }}
                      >
                        Book
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
