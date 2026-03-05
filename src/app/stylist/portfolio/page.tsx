"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const portfolio = [
  { title: "Bridal Look", desc: "Soft waves + gold accessories" },
  { title: "Color Transformation", desc: "Balayage + toner finish" },
  { title: "Event Updo", desc: "Clean bun + volume top" },
];

export default function StylistPortfolioPage() {
  return (
    <PageLayout title="Portfolio" description="Showcase your best work and styles.">
      <div className="flex justify-end">
        <Button
          className="rounded-xl"
          onClick={() => toast.info("Upload later (frontend demo)")}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          Add work
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {portfolio.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-4">
            <div className="h-28 rounded-xl bg-secondary mb-3" />
            <p className="text-sm font-semibold">{p.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
