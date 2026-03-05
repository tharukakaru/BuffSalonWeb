import RolePage from "@/components/role/RolePage";

export default function AdminOrdersPage() {
  return (
    <RolePage
      title="Orders"
      subtitle="Track marketplace orders and fulfillment."
      actions={[{ label: "Order Tracking", href: "/order-tracking", variant: "outline" }]}
    />
  );
}
