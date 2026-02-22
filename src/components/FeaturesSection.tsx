"use client";

import { MapPin, Calendar, Star, Clock, ShoppingBag, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: MapPin,
    title: "Salon Discovery",
    description: "Find top-rated salons near you with real reviews, pricing, and availability.",
  },
  {
    icon: Calendar,
    title: "Instant Booking",
    description: "Book appointments in seconds. Choose your stylist, time, and service with ease.",
  },
  {
    icon: ShoppingBag,
    title: "Shop Products",
    description: "Browse and purchase premium hair care products recommended for your needs.",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Read honest reviews from real customers to find the perfect stylist.",
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description: "See live stylist schedules and get notified of cancellations and openings.",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Your data is protected with enterprise-grade security and trusted payment processing.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            From salon discovery to product shopping — your complete beauty experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
