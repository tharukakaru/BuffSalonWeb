import RolePage from "@/components/role/RolePage";

export default function AdminSettingsPage() {
  return (
    <RolePage
      title="Settings"
      subtitle="Platform configuration and admin preferences."
      actions={[{ label: "Admin Dashboard", href: "/admin", variant: "outline" }]}
    />
  );
}
