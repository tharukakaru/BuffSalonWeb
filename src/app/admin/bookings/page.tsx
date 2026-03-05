import RolePage from "@/components/role/RolePage";

export default function AdminBookingsPage() {
  return (
    <RolePage
      title="Bookings"
      subtitle="Monitor appointments across salons and stylists."
      actions={[{ label: "Customer Bookings", href: "/bookings", variant: "outline" }]}
    />
  );
}
