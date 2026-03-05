import RolePage from "@/components/role/RolePage";

export default function AdminRevenuePage() {
  return (
    <RolePage
      title="Revenue"
      subtitle="Track platform revenue, payouts, and commissions."
      actions={[{ label: "Reports", href: "/admin/reports", variant: "outline" }]}
    />
  );
}
