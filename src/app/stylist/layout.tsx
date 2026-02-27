import RoleShell, { RoleIcons, RoleNavItem } from "@/components/layout/RoleShell";

const nav: RoleNavItem[] = [
  { label: "Dashboard", path: "/stylist", icon: RoleIcons.Dashboard },
  { label: "Home Visits", path: "/stylist/home-visits", icon: RoleIcons.Bookings },
  { label: "Portfolio", path: "/stylist/portfolio", icon: RoleIcons.Services },
  { label: "Availability", path: "/stylist/availability", icon: RoleIcons.Bookings },
  { label: "Earnings", path: "/stylist/earnings", icon: RoleIcons.Earnings },
  { label: "Settings", path: "/stylist/settings", icon: RoleIcons.Settings },
];

export default function StylistLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell title="Stylist Dashboard" nav={nav}>
      {children}
    </RoleShell>
  );
}
