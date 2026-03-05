import RolePage from "@/components/role/RolePage";

export default function AdminStylistsPage() {
  return (
    <RolePage
      title="Stylists"
      subtitle="Review stylist profiles and availability."
      actions={[{ label: "Customer Stylists", href: "/stylists", variant: "outline" }]}
    />
  );
}
