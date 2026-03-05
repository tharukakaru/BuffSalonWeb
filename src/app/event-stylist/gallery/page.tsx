"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const gallery = [
  { title: "Soft bridal waves", tag: "Bridal" },
  { title: "High bun + veil", tag: "Wedding" },
  { title: "Glam curls", tag: "VIP" },
  { title: "Classic updo", tag: "Event" },
  { title: "Natural glow", tag: "Bridal" },
  { title: "Half-up style", tag: "Wedding" },
];

export default function EventGalleryPage() {
  return (
    <PageLayout title="Gallery" description="Showcase bridal and event work.">
      <div className="flex justify-end">
        <Button
          className="rounded-xl"
          onClick={() => toast.info("Upload later (frontend demo)")}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          Add photos
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {gallery.map((g) => (
          <div key={g.title} className="rounded-2xl border border-border bg-card p-4">
            <div className="h-28 rounded-xl bg-secondary mb-3" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{g.title}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold">
                {g.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
