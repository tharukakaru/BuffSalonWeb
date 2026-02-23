import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-8 w-40 mt-3" />
        <Skeleton className="h-4 w-72 mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card/50 p-6"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-28 mt-4" />
            <Skeleton className="h-3 w-24 mt-2" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56 mt-2" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/40 bg-background/40 px-4 py-3"
              >
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28 mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64 mt-2" />
          <Skeleton className="h-40 w-full mt-5 rounded-xl" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/40 bg-background/40 px-4 py-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-20 mt-2" />
            </div>
            <div className="rounded-xl border border-border/40 bg-background/40 px-4 py-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
