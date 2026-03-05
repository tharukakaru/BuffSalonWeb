import RoleShell, { RoleIcons, RoleNavItem } from "@/components/layout/RoleShell";

const nav: RoleNavItem[] = [
  { label: "Dashboard", path: "/admin", icon: RoleIcons.Dashboard },
  { label: "Users", path: "/admin/users", icon: RoleIcons.Staff },
  { label: "Salons", path: "/admin/salons", icon: RoleIcons.Services },
  { label: "Stylists", path: "/admin/stylists", icon: RoleIcons.Services },
  { label: "Vendors", path: "/admin/vendors", icon: RoleIcons.Staff },
  { label: "Orders", path: "/admin/orders", icon: RoleIcons.Orders },
  { label: "Bookings", path: "/admin/bookings", icon: RoleIcons.Bookings },
  { label: "Revenue", path: "/admin/revenue", icon: RoleIcons.Earnings },
  { label: "Reports", path: "/admin/reports", icon: RoleIcons.Analytics },
  { label: "Products", path: "/admin/products", icon: RoleIcons.Products },
  { label: "AI Usage", path: "/admin/ai-usage", icon: RoleIcons.Analytics },
  { label: "Settings", path: "/admin/settings", icon: RoleIcons.Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell title="Admin Panel" nav={nav}>
      {children}
    </RoleShell>
  );
}
