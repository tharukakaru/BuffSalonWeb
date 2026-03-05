import RolePage from "@/components/role/RolePage";

export default function VendorProductsPage() {
  return (
    <RolePage
      title="Products"
      subtitle="Manage listings, pricing, and visibility."
      actions={[{ label: "Customer Shop", href: "/shop", variant: "outline" }]}
    />
  );
}
