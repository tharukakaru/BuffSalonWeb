"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Scissors } from "lucide-react";

const stylists = [
  { id: "st1", name: "Kaveen Hair Artist", area: "Gampaha", rating: 4.6 },
  { id: "st2", name: "Naya Glam", area: "Colombo", rating: 4.7 },
  { id: "st3", name: "Rashi Styles", area: "Kalutara", rating: 4.5 },
];

export default function StylistsPage() {
  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Stylists</h1>
          <p className="text-sm text-muted-foreground">Find stylists for salon, home visit, or events.</p>
        </div>
        <Button asChild className="h-9">
          <Link href="/explore">Explore</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stylists.map((s) => (
          <Card key={s.id} className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                <Scissors className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{s.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {s.area}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-accent-gold" /> {s.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button variant="outline" className="h-9 text-xs" asChild>
                <Link href="/bookings">Book</Link>
              </Button>
              <Button className="h-9 text-xs" asChild>
                <Link href="/try-on">Try-On</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
