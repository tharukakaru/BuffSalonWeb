import RolePage from "@/components/role/RolePage";

export default function StylistPortfolioPage() {
  return (
    <RolePage
      title="Portfolio"
      subtitle="Upload work, before/after, and featured looks."
      actions={[{ label: "Try-On", href: "/try-on", variant: "outline" }]}
    />
  );
}
