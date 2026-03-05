"use client";

import PageLayout from "@/components/dashboard/PageLayout";
import RowCard from "@/components/dashboard/RowCard";
import { Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const users = [
  { name: "Emma Johnson", role: "Customer", status: "active" },
  { name: "Sophia Lee", role: "Salon Owner", status: "active" },
  { name: "Michael Brown", role: "Vendor", status: "review" },
  { name: "Anna Davis", role: "Stylist", status: "active" },
];

export default function AdminUsersPage() {
  return (
    <PageLayout title="Users" description="Manage customer and partner accounts.">
      <div className="grid gap-3">
        {users.map((u) => (
          <RowCard
            key={u.name}
            icon={Users}
            title={u.name}
            subtitle={u.role}
            badge={{
              text: u.status,
              tone: u.status === "active" ? "success" : "gold",
            }}
            right={
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-xl"
                  onClick={() => toast.success("Verified (frontend demo)")}
                >
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  Verify
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </PageLayout>
  );
}
