"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  MapPin,
  Shield,
  Bell,
  CreditCard,
  Sparkles,
  LogOut,
  ChevronRight,
  Settings,
  CalendarDays,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();

  const user = useMemo(
    () => ({
      name: "Sarah",
      email: "sarah@buffsalon.com",
      location: "Colombo",
      tier: "Gold",
      credits: { used: 18, total: 25 },
    }),
    []
  );

  const percent = Math.round((user.credits.used / user.credits.total) * 100);

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto space-y-5 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account (frontend demo).
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-accent-gold text-background flex items-center justify-center font-bold">
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold truncate">{user.name}</p>
            <div className="mt-1 space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {user.location}
              </p>
            </div>
          </div>

          <span className="px-3 py-1.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold">
            {user.tier}
          </span>
        </div>

        {/* Credits */}
        <div className="mt-5 rounded-2xl border border-border bg-secondary/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-gold" />
              <p className="text-sm font-semibold">AI Credits</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {user.credits.used} / {user.credits.total}
            </p>
          </div>

          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-[--p] rounded-full bg-gradient-to-r from-accent-gold to-accent-gold/70" style={{ "--p": `${percent}%` } as any} />
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              className="h-10"
              onClick={() => {
                toast.info("Top-up handled by backend later");
              }}
            >
              Top up
            </Button>
            <Button variant="outline" className="h-10" onClick={() => router.push("/agent")}>
              Ask AI
            </Button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-3">
        <ActionRow
          icon={CalendarDays}
          title="My bookings"
          desc="View upcoming and past appointments"
          onClick={() => router.push("/bookings")}
        />
        <ActionRow
          icon={Heart}
          title="Saved salons"
          desc="Your favorites (frontend demo)"
          onClick={() => toast.info("Saved list can be added later")}
        />
      </div>

      {/* Settings */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Settings className="h-4 w-4 text-accent-gold" /> Settings
          </p>
        </div>

        <div className="divide-y divide-border">
          <SettingRow
            icon={User}
            title="Account"
            desc="Name, password, preferences"
            onClick={() => toast.info("Account settings (demo)")}
          />
          <SettingRow
            icon={Bell}
            title="Notifications"
            desc="Push, email reminders"
            onClick={() => toast.info("Notifications settings (demo)")}
          />
          <SettingRow
            icon={Shield}
            title="Privacy & security"
            desc="Permissions and security"
            onClick={() => toast.info("Privacy settings (demo)")}
          />
          <SettingRow
            icon={CreditCard}
            title="Payments"
            desc="Cards and billing (backend later)"
            onClick={() => toast.info("Payments handled by backend later")}
          />
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full h-11"
        onClick={() => toast("Logout (frontend demo)")}
      >
        <LogOut className="h-4 w-4 mr-2" /> Logout
      </Button>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  title,
  desc,
  onClick,
}: {
  icon: any;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border border-border bg-card p-4 hover:border-accent-gold/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-2xl bg-accent-gold/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{desc}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
      </div>
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  desc,
  onClick,
}: {
  icon: any;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 hover:bg-secondary/40 transition-colors flex items-center gap-3"
    >
      <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
