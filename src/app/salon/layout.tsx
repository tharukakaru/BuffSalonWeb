import RoleShell, { RoleIcons, RoleNavItem } from "@/components/layout/RoleShell"; //jjhvj

const nav: RoleNavItem[] = [
  { label: "Dashboard", path: "/salon", icon: RoleIcons.Dashboard },
  { label: "Bookings", path: "/salon/bookings", icon: RoleIcons.Bookings },
  { label: "Services", path: "/salon/services", icon: RoleIcons.Services },
  { label: "Staff", path: "/salon/staff", icon: RoleIcons.Staff },
  { label: "Reviews", path: "/salon/reviews", icon: RoleIcons.Reviews },
  { label: "Analytics", path: "/salon/analytics", icon: RoleIcons.Analytics },
  { label: "Earnings", path: "/salon/earnings", icon: RoleIcons.Earnings },
  { label: "Settings", path: "/salon/settings", icon: RoleIcons.Settings },
];

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell title="Salon Dashboard" nav={nav}>
      {children}
    </RoleShell>
  );
}
