import RolePage from "@/components/role/RolePage";

export default function SalonBookingsPage() {
  return (
    <RolePage
      title="Salon Bookings"
      subtitle="Manage incoming appointments and schedules."
      actions={[{ label: "View Customer Bookings", href: "/bookings", variant: "outline" }]}
    />
  );
}
