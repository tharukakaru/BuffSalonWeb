"use client";

import Navbar from "@/components/Navbar";
import NotFound from "@/pages/NotFound";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <NotFound />
      </main>
      <Footer />
    </div>
  );
}
