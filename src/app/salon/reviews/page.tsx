"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Star, MessageSquareText } from "lucide-react";

const reviews = [
  { name: "Emma", rating: 5, text: "Amazing service and lovely staff.", tone: "success" as const },
  { name: "Sophia", rating: 4, text: "Great haircut. Will come again.", tone: "gold" as const },
];

export default function SalonReviewsPage() {
  return (
    <PageLayout title="Reviews" description="See what customers are saying about your salon.">
      <div className="grid gap-3">
        {reviews.map((r, i) => (
          <RowCard
            key={i}
            icon={MessageSquareText}
            title={`${r.name} · ${"★".repeat(r.rating)}`}
            subtitle={r.text}
            badge={{ text: `${r.rating}/5`, tone: r.tone }}
            right={<Star className="h-4 w-4 text-accent-gold" />}
          />
        ))}
      </div>
    </PageLayout>
  );
}
