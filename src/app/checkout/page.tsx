"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { toast } from "sonner";
import {
  CreditCard,
  Lock,
  MapPin,
  Truck,
  ShieldCheck,
  TicketPercent,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

function formatCardNumber(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 16);
  const groups = digits.match(/.{1,4}/g) ?? [];
  return groups.join(" ");
}

function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { items, count, total, clear } = useCart();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  const [fullName, setFullName] = useState("Jane Doe");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const [cardName, setCardName] = useState("Jane Doe");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = useMemo(() => (total >= 75 ? 0 : 4.99), [total]);
  const grandTotal = useMemo(() => total + shipping, [total, shipping]);

  const canPay =
    count > 0 &&
    fullName.trim().length > 1 &&
    phone.trim().length >= 7 &&
    address1.trim().length > 4 &&
    city.trim().length > 1 &&
    cardName.trim().length > 1 &&
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length >= 3;

  const handleApplyPromo = () => {
    if (!promo.trim()) {
      toast.error("Enter a promo code first.");
      return;
    }
    setPromoApplied(true);
    toast.success("Promo applied!", { description: "Discount will reflect at payment." });
  };

  const handlePay = () => {
    if (!canPay) {
      toast.error("Please complete all required fields.");
      return;
    }

    toast.success("Payment successful!", { description: "Your order has been placed." });
    clear();
    router.push("/profile");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto text-center rounded-3xl bg-white border border-gray-200 p-10 shadow-[0_30px_80px_-55px_rgba(0,0,0,0.25)]">
              <p className="text-gray-900 font-display font-bold text-2xl mb-2">
                Redirecting…
              </p>
              <p className="text-gray-600 font-body">Taking you to login.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 relative overflow-hidden text-black">
      {/* Light premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl gradient-primary" />
        <div className="absolute top-24 left-[-180px] w-[520px] h-[520px] rounded-full opacity-10 blur-3xl gradient-primary" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white to-gray-50" />
      </div>

      <Navbar />

      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="rounded-3xl border border-gray-200 bg-white/85 backdrop-blur-xl p-6 overflow-hidden relative shadow-[0_30px_80px_-55px_rgba(0,0,0,0.25)]">
              <div className="absolute inset-x-0 top-0 h-1 gradient-primary" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-body">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-gray-900 font-semibold">Secure Checkout</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">Fast & protected</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-4">
                    Review & Pay
                  </h1>
                  <p className="text-gray-600 font-body mt-1">
                    Complete delivery + payment to place your order.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-body font-semibold bg-gray-50 text-gray-800 border border-gray-200">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Encrypted Payments
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-body font-semibold bg-gray-50 text-gray-800 border border-gray-200">
                    <Truck className="w-4 h-4 text-primary" />
                    2–4 Day Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 p-6 shadow-[0_25px_70px_-55px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900">
                      Delivery Details
                    </h2>
                    <p className="text-sm font-body text-gray-600">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Full Name
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Phone
                    </label>
                    <input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/[^\d+]/g, "").slice(0, 15))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="+94 7X XXX XXXX"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Address
                    </label>
                    <input
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="House No, Street, Area"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      City
                    </label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="Colombo"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Delivery Notes (optional)
                    </label>
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="e.g. call before delivery"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-body">
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800">
                    <Truck className="w-4 h-4 text-primary" />
                    Standard delivery • 2–4 business days
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                    Verified dispatch partners
                  </span>
                </div>
              </div>

              {/* Payment (keep exactly same content, only colors are tuned) */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 p-6 shadow-[0_25px_70px_-55px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                    <CreditCard className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900">
                      Payment
                    </h2>
                    <p className="text-sm font-body text-gray-600">
                      Pay securely with card (Visa / Master).
                    </p>
                  </div>
                </div>

                {/* Card preview stays dark (looks premium), rest is light */}
                <div className="rounded-3xl p-6 bg-black text-white relative overflow-hidden mb-6 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.55)]">
                  <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-30 blur-2xl gradient-primary" />
                  <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-20 blur-2xl gradient-primary" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-sm font-body font-medium text-white/80">
                          Secure Payment
                        </span>
                      </div>
                      <div className="text-xs font-body text-white/70">
                        VISA • MASTER
                      </div>
                    </div>

                    <div className="mt-6 text-2xl font-display tracking-widest">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>

                    <div className="mt-6 flex items-center justify-between text-sm font-body text-white/80">
                      <div className="truncate max-w-[65%]">
                        {cardName || "CARDHOLDER NAME"}
                      </div>
                      <div>{expiry || "MM/YY"}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Cardholder Name
                    </label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="Name on card"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Card Number
                    </label>
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      inputMode="numeric"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      Expiry (MM/YY)
                    </label>
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      inputMode="numeric"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="MM/YY"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-body font-semibold text-gray-900 mb-1 block">
                      CVV
                    </label>
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      inputMode="numeric"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-gray-600 font-body">
                  <Lock className="w-4 h-4" />
                  <span>Your payment info is encrypted & protected.</span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <aside className="lg:col-span-1">
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 p-6 sticky top-28 shadow-[0_25px_70px_-55px_rgba(0,0,0,0.22)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-bold text-gray-900">
                    Order Summary
                  </h3>
                  <span className="text-xs font-body font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {count} item(s)
                  </span>
                </div>

                {count === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-600 font-body mb-4">
                      Your cart is empty.
                    </p>
                    <Button
                      variant="hero"
                      className="rounded-full px-8"
                      onClick={() => router.push("/products")}
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Promo */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <TicketPercent className="w-4 h-4 text-primary" />
                        <p className="text-sm font-body font-semibold text-gray-900">
                          Promo Code
                        </p>
                        {promoApplied && (
                          <span className="ml-auto text-xs font-body font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            Applied
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input
                          value={promo}
                          onChange={(e) => {
                            setPromo(e.target.value);
                            setPromoApplied(false);
                          }}
                          className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-200 font-body text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="e.g. LILY10"
                        />
                        <Button
                          variant="hero-outline"
                          className="rounded-xl px-4"
                          onClick={handleApplyPromo}
                          type="button"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs font-body text-gray-500 mt-2">
                        Tip: Try <span className="text-gray-900 font-semibold">LILY10</span> (demo).
                      </p>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {items.map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200"
                        >
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-body font-medium text-gray-900 truncate">
                              {it.name}
                            </p>
                            <p className="text-xs font-body text-gray-600">
                              Qty: {it.qty}
                            </p>
                          </div>
                          <div className="text-sm font-body font-semibold text-gray-900">
                            ${(it.price * it.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 my-5" />

                    {/* Totals */}
                    <div className="space-y-3 font-body">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900 font-semibold">
                          ${total.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900 font-semibold">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-base">
                        <span className="text-gray-900 font-semibold">Total</span>
                        <span className="text-gray-900 font-bold text-lg">
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Trust */}
                    <div className="mt-5 rounded-2xl bg-gray-50 border border-gray-200 p-4">
                      <div className="flex items-center gap-2 text-sm font-body text-gray-800">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="font-semibold">100% Secure</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">Visa / Master</span>
                      </div>
                      <p className="text-xs font-body text-gray-500 mt-1">
                        Your card is never stored. Encrypted checkout.
                      </p>
                    </div>

                    {/* Pay button */}
                    <div className="mt-6 relative">
                      <div className="absolute inset-0 blur-2xl opacity-20 gradient-primary rounded-full" />
                      <Button
                        variant="hero"
                        className="w-full rounded-full py-6 text-base relative"
                        onClick={handlePay}
                        disabled={!canPay}
                      >
                        Pay Now
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500 font-body mt-3 text-center">
                      By paying, you agree to our Terms & Privacy Policy.
                    </p>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
