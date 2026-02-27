import RoleShell, { RoleIcons, RoleNavItem } from "@/components/layout/RoleShell";

const nav: RoleNavItem[] = [
  { label: "Dashboard", path: "/vendor", icon: RoleIcons.Dashboard },
  { label: "Products", path: "/vendor/products", icon: RoleIcons.Products },
  { label: "Orders", path: "/vendor/orders", icon: RoleIcons.Orders },
  { label: "Inventory", path: "/vendor/inventory", icon: RoleIcons.Inventory },
  { label: "Promotions", path: "/vendor/promotions", icon: RoleIcons.Analytics },
  { label: "Analytics", path: "/vendor/analytics", icon: RoleIcons.Analytics },
  { label: "Earnings", path: "/vendor/earnings", icon: RoleIcons.Earnings },
  { label: "Settings", path: "/vendor/settings", icon: RoleIcons.Settings },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell title="Vendor Dashboard" nav={nav}>
      {children}
    </RoleShell>
  );
}
