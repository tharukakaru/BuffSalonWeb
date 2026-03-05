"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Flag, Trash2 } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const products = [
  { name: "Argan Oil Serum", vendor: "GlowUp Beauty Co.", price: "$32" },
  { name: "Silk Hair Mask", vendor: "GlowUp Beauty Co.", price: "$28" },
  { name: "Keratin Shampoo", vendor: "Luxe Haircare", price: "$22" },
  { name: "Suspicious Product", vendor: "Unknown Vendor", price: "$5" },
];

export default function AdminProductsPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto space-y-6">
      <motion.h1 variants={item} initial="hidden" animate="show" className="text-xl font-semibold">
        Products
      </motion.h1>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
        {products.map((p, i) => (
          <motion.div
            key={i}
            variants={item}
            className="rounded-xl border border-border p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-lg bg-secondary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {p.vendor} · {p.price}
              </p>
            </div>

            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-[10px] rounded-lg"
                onClick={() => toast.warning("Flagged for review")}
              >
                <Flag className="h-3 w-3 mr-1" />
                Flag
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="h-7 text-[10px] rounded-lg hover:bg-destructive/10"
                onClick={() => toast.error("Product removed")}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
