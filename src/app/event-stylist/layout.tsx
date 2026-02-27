import RoleShell, { RoleIcons, RoleNavItem } from "@/components/layout/RoleShell";

const nav: RoleNavItem[] = [
  { label: "Dashboard", path: "/event-stylist", icon: RoleIcons.Dashboard },
  { label: "Calendar", path: "/event-stylist/calendar", icon: RoleIcons.Bookings },
  { label: "Packages", path: "/event-stylist/packages", icon: RoleIcons.Services },
  { label: "Gallery", path: "/event-stylist/gallery", icon: RoleIcons.Services },
  { label: "Bookings", path: "/event-stylist/bookings", icon: RoleIcons.Bookings },
  { label: "Earnings", path: "/event-stylist/earnings", icon: RoleIcons.Earnings },
  { label: "Settings", path: "/event-stylist/settings", icon: RoleIcons.Settings },
];

export default function EventStylistLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell title="Event Stylist" nav={nav}>
      {children}
    </RoleShell>
  );
}
