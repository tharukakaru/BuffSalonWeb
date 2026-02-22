"use client";

import Navbar from "@/components/Navbar";
import ProductsPage from "@/pages/ProductsPage";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <ProductsPage />
      </main>
      <Footer />
    </div>
  );
}
