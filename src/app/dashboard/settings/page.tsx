import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-accent-gold" />
          Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your dashboard preferences.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Email Notifications</div>
            <div className="text-xs text-muted-foreground">
              Get updates about bookings and sales.
            </div>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">SMS Alerts</div>
            <div className="text-xs text-muted-foreground">
              Receive reminders via SMS.
            </div>
          </div>
          <input type="checkbox" className="h-4 w-4" />
        </div>

        <div className="pt-2">
          <Button className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
