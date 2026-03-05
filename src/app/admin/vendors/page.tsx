import RolePage from "@/components/role/RolePage";

export default function AdminVendorsPage() {
  return (
    <RolePage
      title="Vendors"
      subtitle="Manage marketplace vendors and compliance."
      actions={[{ label: "Shop", href: "/shop", variant: "outline" }]}
    />
  );
}
