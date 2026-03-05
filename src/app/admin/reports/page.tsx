import RolePage from "@/components/role/RolePage";

export default function AdminReportsPage() {
  return (
    <RolePage
      title="Reports"
      subtitle="Analytics, exports, and platform health."
      actions={[{ label: "Revenue", href: "/admin/revenue", variant: "outline" }]}
    />
  );
}
