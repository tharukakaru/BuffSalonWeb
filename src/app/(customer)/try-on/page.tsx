"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Wand2,
  Scissors,
  Palette,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const styles = [
  { title: "Soft Curls", icon: Sparkles, tag: "Trending" },
  { title: "Sleek Straight", icon: Wand2, tag: "Classic" },
  { title: "Short Bob", icon: Scissors, tag: "Cut" },
  { title: "Balayage", icon: Palette, tag: "Color" },
  { title: "Bridal Updo", icon: Crown, tag: "Bridal" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function TryOnPage() {
  const router = useRouter();
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-gold" />
          AI Try-On
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a selfie and preview hairstyles (frontend demo).
        </p>
      </div>

      {/* Upload */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-accent-gold/10 flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold">Your photo</p>
              <p className="text-xs text-muted-foreground">
                We’ll add real AI later — for now this is UI-only.
              </p>
            </div>
          </div>

          <Button
            className="h-10"
            onClick={() => {
              setHasImage(true);
              toast.success("Photo uploaded (demo)");
            }}
          >
            <Upload className="h-4 w-4 mr-2" /> Upload
          </Button>
        </div>

        <div className="mt-4 h-48 md:h-56 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground">
          {hasImage ? "Selfie preview (demo placeholder)" : "No image uploaded"}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            className="h-10"
            onClick={() => toast.info("Camera capture (demo)")}
          >
            <Upload className="h-4 w-4 mr-2" /> Use camera
          </Button>
          <Button
            variant="outline"
            className="h-10"
            onClick={() => {
              toast.info("AI agent can recommend styles");
              router.push("/agent");
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" /> Ask AI
          </Button>
        </div>
      </div>

      {/* Styles grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Try styles</h2>
          <button
            className="text-xs text-accent-gold"
            onClick={() => toast.info("More styles coming soon")}
          >
            View all
          </button>
        </div>

        <motion.div variants={container} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {styles.map((s) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.title}
                variants={item}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!hasImage) {
                    toast.info("Upload a photo first (demo)");
                    return;
                  }
                  toast.success(`Applied ${s.title} (demo)`);
                }}
                className="rounded-2xl border border-border bg-card p-4 text-left hover:border-accent-gold/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-accent-gold" />
                </div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.tag}</p>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* CTA */}
      <div className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Ready to book a stylist?</p>
          <p className="text-xs text-muted-foreground mt-1">
            Turn your try-on into a real appointment.
          </p>
        </div>
        <Button className="h-10" onClick={() => router.push("/explore")}>
          Explore <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
