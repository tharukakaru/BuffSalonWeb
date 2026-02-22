"use client";

import Navbar from "@/components/Navbar";
import PricingPage from "@/pages/PricingPage";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <PricingPage />
      </main>
      <Footer />
    </div>
  );
}
