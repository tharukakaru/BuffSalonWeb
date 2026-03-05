import RolePage from "@/components/role/RolePage";

export default function VendorOrdersPage() {
  return (
    <RolePage
      title="Orders"
      subtitle="Process orders, shipping, and returns."
      actions={[{ label: "Order Tracking", href: "/order-tracking", variant: "outline" }]}
    />
  );
}
