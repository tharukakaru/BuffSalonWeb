"use client";

import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const salons = [
  {
    name: "Luxe Hair Studio",
    location: "Downtown, NYC",
    rating: 4.9,
    reviews: 234,
    specialty: "Color & Highlights",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
  },
  {
    name: "Bella Vita Salon",
    location: "Brooklyn, NYC",
    rating: 4.8,
    reviews: 187,
    specialty: "Cuts & Styling",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
  },
  {
    name: "The Style Bar",
    location: "Midtown, NYC",
    rating: 4.7,
    reviews: 312,
    specialty: "Bridal & Events",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
  },
];

const SalonsSection = () => {
  return (
    <section id="salons" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Top Salons
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Nearby Salons
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Discover the best-rated salons in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {salons.map((salon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
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
                <Button variant="hero" size="sm" className="w-full rounded-full">
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="hero-outline" className="rounded-full px-8">
            <Link href="/salons">
              View All Salons <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SalonsSection;
