import RolePage from "@/components/role/RolePage";

export default function EventStylistPackagesPage() {
  return (
    <RolePage
      title="Packages"
      subtitle="Create bridal packages and pricing tiers."
      actions={[{ label: "Wedding Planner", href: "/events/wedding", variant: "outline" }]}
    />
  );
}
