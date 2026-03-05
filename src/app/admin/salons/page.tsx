import RolePage from "@/components/role/RolePage";

export default function AdminSalonsPage() {
  return (
    <RolePage
      title="Salons"
      subtitle="Approve, manage listings, and monitor performance."
      actions={[{ label: "Go to Salons List", href: "/salons", variant: "outline" }]}
    />
  );
}
