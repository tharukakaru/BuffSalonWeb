import RolePage from "@/components/role/RolePage";

export default function AdminUsersPage() {
  return (
    <RolePage
      title="Users"
      subtitle="Manage customers, role access, and verification."
      actions={[{ label: "View Dashboard", href: "/admin", variant: "outline" }]}
    />
  );
}
