import RolePage from "@/components/role/RolePage";

export default function SalonServicesPage() {
  return (
    <RolePage
      title="Services"
      subtitle="Edit services, pricing, and duration."
      actions={[{ label: "Explore", href: "/explore", variant: "outline" }]}
    />
  );
}
