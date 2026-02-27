import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center">
            <Scissors className="h-4.5 w-4.5 text-background" strokeWidth={2} />
          </div>
          <div>
            <div className="font-bold tracking-tight">BUFF SALON</div>
            <div className="text-xs text-muted-foreground">
              AI beauty booking & commerce
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BUFF SALON. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
