"use client";

import { User, Calendar, ShoppingBag, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockBookings = [
  {
    salon: "Luxe Hair Studio",
    service: "Color & Highlights",
    date: "Feb 20, 2026",
    time: "10:30 AM",
    status: "Upcoming",
  },
  {
    salon: "Bella Vita Salon",
    service: "Haircut & Styling",
    date: "Feb 10, 2026",
    time: "2:00 PM",
    status: "Completed",
  },
];

const mockOrders = [
  {
    product: "Silk Repair Shampoo",
    price: 28.99,
    date: "Feb 12, 2026",
    status: "Delivered",
  },
  {
    product: "Argan Oil Serum",
    price: 42.0,
    date: "Feb 5, 2026",
    status: "Delivered",
  },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-12"
          >
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground">
              <User className="w-10 h-10" />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-display font-bold text-foreground">
                Jane Doe
              </h1>
              <p className="text-muted-foreground font-body">jane@example.com</p>
              <span className="inline-block mt-2 gradient-primary text-primary-foreground text-xs font-body font-semibold px-4 py-1 rounded-full">
                Pro Member
              </span>
            </div>

            <div className="sm:ml-auto flex gap-3">
              <Button asChild variant="hero-outline" size="sm" className="rounded-full">
                <Link href="/profile/settings">
                  <Settings className="w-4 h-4 mr-1" /> Settings
                </Link>
              </Button>

              <Button asChild variant="ghost" size="sm" className="rounded-full text-destructive">
                <Link href="/login">
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Bookings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> My Bookings
              </h2>
              <Link
                href="/salons"
                className="text-sm font-body text-primary hover:underline"
              >
                Book New
              </Link>
            </div>

            <div className="space-y-3">
              {mockBookings.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <div>
                    <p className="font-body font-medium text-foreground">
                      {b.salon}
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      {b.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body text-foreground">
                      {b.date} · {b.time}
                    </p>
                    <span
                      className={`text-xs font-body font-medium px-3 py-1 rounded-full ${
                        b.status === "Upcoming"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Orders */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Purchase History
              </h2>
              <Link
                href="/products"
                className="text-sm font-body text-primary hover:underline"
              >
                Shop More
              </Link>
            </div>

            <div className="space-y-3">
              {mockOrders.map((o, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <div>
                    <p className="font-body font-medium text-foreground">
                      {o.product}
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      {o.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body font-bold text-foreground">
                      ${o.price.toFixed(2)}
                    </p>
                    <span className="text-xs font-body font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
