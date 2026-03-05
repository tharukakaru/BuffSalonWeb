"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Heart,
  Sparkles,
  ClipboardList,
  MapPin,
  Users,
  Wallet,
  Crown,
  Scissors,
  Brush,
  Camera,
  Store,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";

type ChecklistItem = {
  id: string;
  title: string;
  due: string;
  done: boolean;
};

type Vendor = {
  id: string;
  name: string;
  type: "Salon" | "Stylist" | "Makeup" | "Photography" | "Florist" | "Dress" | "Other";
  location: string;
  priceHint: string;
  rating: number;
};

type BudgetLine = {
  id: string;
  label: string;
  planned: number;
  actual: number;
};

const currency = (n: number) =>
  `LKR ${n.toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

export default function WeddingPlannerPage() {
  const router = useRouter();

  const [eventName, setEventName] = useState("My Wedding");
  const [weddingDate, setWeddingDate] = useState("2026-08-22");
  const [district, setDistrict] = useState("Colombo");

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "c1", title: "Pick a bridal look inspiration", due: "Today", done: true },
    { id: "c2", title: "Shortlist salons for bridal trial", due: "This week", done: true },
    { id: "c3", title: "Book bridal hair & makeup trial", due: "Next week", done: false },
    { id: "c4", title: "Confirm bridesmaids styling", due: "In 2 weeks", done: false },
    { id: "c5", title: "Finalize wedding-day schedule", due: "In 1 month", done: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const vendors: Vendor[] = useMemo(
    () => [
      {
        id: "v1",
        name: "Velvet Bridal Studio",
        type: "Salon",
        location: "Colombo 07",
        priceHint: "From LKR 35,000",
        rating: 4.8,
      },
      {
        id: "v2",
        name: "Naya Glam (MUA)",
        type: "Makeup",
        location: "Colombo",
        priceHint: "From LKR 28,000",
        rating: 4.7,
      },
      {
        id: "v3",
        name: "Kaveen Hair Artist",
        type: "Stylist",
        location: "Gampaha",
        priceHint: "From LKR 22,000",
        rating: 4.6,
      },
      {
        id: "v4",
        name: "Aster Weddings",
        type: "Photography",
        location: "Colombo",
        priceHint: "From LKR 75,000",
        rating: 4.9,
      },
    ],
    []
  );

  const [budget, setBudget] = useState<BudgetLine[]>([
    { id: "b1", label: "Bridal Hair", planned: 25000, actual: 0 },
    { id: "b2", label: "Bridal Makeup", planned: 30000, actual: 0 },
    { id: "b3", label: "Bridesmaids", planned: 20000, actual: 0 },
    { id: "b4", label: "Nails / Spa", planned: 10000, actual: 0 },
    { id: "b5", label: "Photoshoot / Touch-ups", planned: 15000, actual: 0 },
  ]);

  const totals = useMemo(() => {
    const planned = budget.reduce((s, x) => s + x.planned, 0);
    const actual = budget.reduce((s, x) => s + x.actual, 0);
    return { planned, actual, remaining: Math.max(0, planned - actual) };
  }, [budget]);

  const checklistDone = useMemo(() => checklist.filter((c) => c.done).length, [checklist]);
  const checklistPct = useMemo(() => Math.round((checklistDone / checklist.length) * 100), [checklistDone, checklist.length]);

  const toggleTask = (id: string) => {
    setChecklist((prev) => prev.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  };

  const addTask = () => {
    const t = newTask.trim();
    if (!t) return;
    setChecklist((prev) => [
      ...prev,
      { id: `c${Date.now()}`, title: t, due: "Custom", done: false },
    ]);
    setNewTask("");
    toast.success("Task added");
  };

  const removeTask = (id: string) => {
    setChecklist((prev) => prev.filter((x) => x.id !== id));
    toast.success("Task removed");
  };

  const setActual = (id: string, value: number) => {
    setBudget((prev) => prev.map((x) => (x.id === id ? { ...x, actual: value } : x)));
  };

  const vendorIcon = (type: Vendor["type"]) => {
    switch (type) {
      case "Salon":
        return <Store className="h-4 w-4" />;
      case "Stylist":
        return <Scissors className="h-4 w-4" />;
      case "Makeup":
        return <Brush className="h-4 w-4" />;
      case "Photography":
        return <Camera className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="px-4 py-6 md:px-8 max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Crown className="h-5 w-5 text-accent-gold" />
            Wedding Planner
          </h1>
          <p className="text-xs text-muted-foreground">
            Plan your bridal look, bookings, and budget in one place.
          </p>
        </div>

        <Button
          className="h-9"
          onClick={() => {
            toast.success("Saved");
          }}
        >
          Save
        </Button>
      </div>

      {/* Hero summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent-gold/20 bg-accent-gold/10 p-4 md:p-5"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs rounded-full bg-accent-gold/20 text-accent-gold px-2 py-1 inline-flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Bridal Mode
              </span>
              <span className="text-xs rounded-full bg-secondary px-2 py-1 inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {weddingDate}
              </span>
              <span className="text-xs rounded-full bg-secondary px-2 py-1 inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {district}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="rounded-xl bg-background/70 border border-border p-3">
                <p className="text-[11px] text-muted-foreground">Event name</p>
                <Input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="h-9 mt-1"
                />
              </div>

              <div className="rounded-xl bg-background/70 border border-border p-3">
                <p className="text-[11px] text-muted-foreground">Wedding date</p>
                <Input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="h-9 mt-1"
                />
              </div>

              <div className="rounded-xl bg-background/70 border border-border p-3">
                <p className="text-[11px] text-muted-foreground">District</p>
                <Input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="h-9 mt-1"
                />
              </div>
            </div>
          </div>

          <div className="md:w-64 rounded-xl bg-background/70 border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Checklist progress</p>
              <p className="text-xs font-semibold text-accent-gold">{checklistPct}%</p>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-accent-gold"
                animate={{ width: `${checklistPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              {checklistDone} of {checklist.length} tasks completed
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button
                variant="outline"
                className="h-9 text-xs"
                onClick={() => router.push("/bookings")}
              >
                Book Now
              </Button>
              <Button
                className="h-9 text-xs"
                onClick={() => router.push("/try-on")}
              >
                Try-On
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Checklist + Inspiration */}
        <div className="lg:col-span-2 space-y-4">
          {/* Checklist */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-accent-gold" />
                <h2 className="text-sm font-semibold">Checklist</h2>
              </div>
              <span className="text-xs text-muted-foreground">
                Tap to mark complete
              </span>
            </div>

            <div className="space-y-1.5">
              {checklist.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-border bg-card p-3 flex items-start gap-3 hover:border-accent-gold/30 transition-colors"
                >
                  <button
                    onClick={() => toggleTask(t.id)}
                    className="mt-0.5"
                    aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                  >
                    {t.done ? (
                      <CheckCircle2 className="h-5 w-5 text-accent-gold" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${t.done ? "line-through text-muted-foreground" : ""}`}>
                      {t.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Due: {t.due}</p>
                  </div>

                  <button
                    onClick={() => removeTask(t.id)}
                    className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center"
                    aria-label="Remove task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a custom task (e.g., bridal nails appointment)"
                className="h-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                }}
              />
              <Button className="h-10" onClick={addTask}>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </Card>

          {/* Inspiration */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent-gold" />
              <h2 className="text-sm font-semibold">Inspiration</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { title: "Soft Glam", emoji: "✨" },
                { title: "Traditional Kandyan", emoji: "👑" },
                { title: "Modern Bridal Bun", emoji: "💎" },
                { title: "Natural Glow", emoji: "🌿" },
              ].map((x) => (
                <button
                  key={x.title}
                  className="rounded-xl border border-border bg-card p-3 text-left hover:border-accent-gold/40 transition-colors"
                  onClick={() => toast.info(`Saved inspiration: ${x.title}`)}
                >
                  <div className="h-10 w-10 rounded-lg bg-accent-gold/10 flex items-center justify-center text-xl">
                    {x.emoji}
                  </div>
                  <p className="text-sm font-medium mt-2">{x.title}</p>
                  <p className="text-[11px] text-muted-foreground">Tap to save</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" className="h-10 text-xs" onClick={() => router.push("/explore")}>
                Explore Styles
              </Button>
              <Button className="h-10 text-xs" onClick={() => router.push("/try-on")}>
                Try Looks in AR
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Vendors + Budget */}
        <div className="space-y-4">
          {/* Vendors */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent-gold" />
                <h2 className="text-sm font-semibold">Shortlisted Vendors</h2>
              </div>
              <button
                className="text-xs text-accent-gold hover:underline"
                onClick={() => router.push("/explore")}
              >
                Add more
              </button>
            </div>

            <div className="space-y-2">
              {vendors.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-border bg-card p-3 hover:border-accent-gold/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent-gold/10 text-accent-gold flex items-center justify-center flex-shrink-0">
                      {vendorIcon(v.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{v.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {v.type} • {v.location}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-semibold text-accent-gold">{v.priceHint}</span>
                        <span className="text-[11px] text-muted-foreground">⭐ {v.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="h-9 text-xs"
                      onClick={() => toast.info(`Calling ${v.name}`)}
                    >
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 text-xs"
                      onClick={() => toast.info(`Chat with ${v.name}`)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      Chat
                    </Button>
                    <Button
                      className="h-9 text-xs"
                      onClick={() => {
                        toast.success(`Opening booking for ${v.name}`);
                        router.push("/bookings");
                      }}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl bg-secondary p-3">
              <p className="text-xs font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-gold" />
                Near you in {district}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Explore bridal artists, packages, and trials in your district.
              </p>
            </div>
          </Card>

          {/* Budget */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="h-4 w-4 text-accent-gold" />
              <h2 className="text-sm font-semibold">Beauty Budget</h2>
            </div>

            <div className="space-y-2">
              {budget.map((b) => (
                <div key={b.id} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{b.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Planned: <span className="font-semibold">{currency(b.planned)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      type="number"
                      className="h-9"
                      value={b.actual}
                      onChange={(e) => setActual(b.id, Number(e.target.value || 0))}
                      min={0}
                    />
                    <Button
                      variant="outline"
                      className="h-9 text-xs"
                      onClick={() => toast.success("Updated actual spend")}
                    >
                      Update
                    </Button>
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-2">
                    Remaining for this:{" "}
                    <span className="font-semibold">
                      {currency(Math.max(0, b.planned - b.actual))}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-secondary p-3 mt-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Planned total</span>
                <span className="font-semibold">{currency(totals.planned)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Actual spend</span>
                <span className="font-semibold">{currency(totals.actual)}</span>
              </div>
              <div className="h-px bg-border my-1" />
              <div className="flex justify-between text-sm font-bold">
                <span>Remaining</span>
                <span className="text-accent-gold">{currency(totals.remaining)}</span>
              </div>
            </div>

            <Button
              className="w-full h-10 mt-3"
              onClick={() => {
                toast.success("Recommended bridal packages loaded");
                router.push("/explore");
              }}
            >
              Browse Bridal Packages
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
