"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ChevronLeft,
  Truck,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Phone,
  Copy,
} from "lucide-react";

const orderSteps = [
  { label: "Order Placed", time: "Feb 19, 10:32 AM", done: true },
  { label: "Confirmed by Vendor", time: "Feb 19, 11:15 AM", done: true },
  { label: "Packed & Ready", time: "Feb 19, 3:45 PM", done: true },
  { label: "Out for Delivery", time: "Feb 20, 9:00 AM", done: false, active: true },
  { label: "Delivered", time: "Estimated Feb 20", done: false },
];

const items = [
  { name: "Keratin Hair Serum", qty: 1, price: "LKR 2,800", image: "KS" },
  { name: "Argan Oil Treatment", qty: 2, price: "LKR 1,500", image: "AO" },
];

export default function OrderTrackingPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-6 md:px-8 max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">Order #GU-ORD-7291</h1>
          <p className="text-xs text-muted-foreground">Placed on Feb 19, 2026</p>
        </div>
      </div>

      {/* Status banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-accent-gold/10 border border-accent-gold/20 p-3.5 flex items-center gap-3"
      >
        <div className="h-10 w-10 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
          <Truck className="h-5 w-5 text-accent-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-accent-gold">Out for Delivery</p>
          <p className="text-xs text-muted-foreground">Your order is on its way!</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3">Delivery Timeline</h3>
        <div className="space-y-0">
          {orderSteps.map((step, i) => (
            <div key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 rounded-full flex-shrink-0 ${
                    step.done
                      ? "bg-accent-gold"
                      : step.active
                      ? "bg-accent-gold ring-4 ring-accent-gold/20"
                      : "bg-secondary border border-border"
                  }`}
                />
                {i < orderSteps.length - 1 && (
                  <div className={`w-px h-8 ${step.done ? "bg-accent-gold" : "bg-border"}`} />
                )}
              </div>
              <div className="pb-4 -mt-0.5">
                <p
                  className={`text-sm font-medium ${
                    step.done || step.active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking ID */}
      <div className="rounded-xl border border-border bg-card p-3.5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tracking Number</p>
          <p className="text-sm font-mono font-medium">SL-TRACK-928374</p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText("SL-TRACK-928374");
            toast.success("Copied!");
          }}
          className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Items */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Items ({items.length})</h3>
        <div className="space-y-1.5">
          {items.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-border bg-card p-3 flex items-center gap-3 cursor-pointer hover:border-accent-gold/30 transition-colors"
              onClick={() => toast.info(item.name)}
            >
              <div className="h-10 w-10 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold text-xs font-bold flex-shrink-0">
                {item.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
              </div>
              <span className="text-sm font-semibold text-accent-gold">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery address */}
      <div className="rounded-xl border border-border bg-card p-3.5">
        <h4 className="text-xs font-semibold text-muted-foreground mb-1">Delivery Address</h4>
        <p className="text-sm">45 Park Street, Colombo 02</p>
        <button
          className="text-xs text-accent-gold mt-1 flex items-center gap-1"
          onClick={() => toast.info("Opening maps")}
        >
          <MapPin className="h-3 w-3" /> View on map
        </button>
      </div>

      {/* Payment */}
      <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Subtotal</span>
          <span>LKR 5,800</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Delivery</span>
          <span>LKR 350</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span className="text-accent-gold">LKR 6,150</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
          <CheckCircle2 className="h-3 w-3 text-accent-gold" /> Paid via helaPay
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-10 text-xs" onClick={() => toast.info("Calling delivery partner")}>
          <Phone className="h-3.5 w-3.5 mr-1" /> Call Driver
        </Button>
        <Button variant="outline" className="h-10 text-xs" onClick={() => toast.info("Chat with vendor")}>
          <MessageSquare className="h-3.5 w-3.5 mr-1" /> Chat Vendor
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full h-10 text-xs text-destructive hover:text-destructive"
        onClick={() => toast.info("Report issue form")}
      >
        Report an Issue
      </Button>
    </div>
  );
}
