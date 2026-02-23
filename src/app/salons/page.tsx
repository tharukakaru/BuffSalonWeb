"use client";

import Navbar from "@/components/Navbar";
import SalonsPage from "@/pages_old/SalonsPage";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <SalonsPage />
      </main>
      <Footer />
    </div>
  );
}
