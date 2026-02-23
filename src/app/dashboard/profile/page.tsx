"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Lock,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [name, setName] = useState("BUFF User");
  const [email, setEmail] = useState("buff@example.com");
  const [phone, setPhone] = useState("+94 77 000 0000");
  const [location, setLocation] = useState("Colombo, Sri Lanka");

  return (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-accent-gold/20 border border-border/40 flex items-center justify-center text-xl font-bold">
              BU
            </div>
            <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-accent-gold text-accent-gold-foreground flex items-center justify-center shadow-md">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
            <p className="text-sm text-muted-foreground">
              Salon Administrator
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Member since 2026
        </div>
      </div>

      {/* Account Info */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Account Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Update your personal and contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-muted-foreground">Full Name</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Phone</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Location</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
            Save Changes
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent-gold" />
            Security
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage password and security settings.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3">
          <div>
            <div className="font-medium">Change Password</div>
            <div className="text-xs text-muted-foreground">
              Last updated 2 months ago
            </div>
          </div>

          <Button variant="outline" className="gap-2">
            <Lock className="h-4 w-4" />
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
