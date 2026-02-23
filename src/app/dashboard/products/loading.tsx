import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-7 w-32" />
            </div>
            <Skeleton className="h-4 w-72 mt-3" />
          </div>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>

        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 border-b border-border">
          <Skeleton className="h-3 w-24 col-span-5" />
          <Skeleton className="h-3 w-20 col-span-3" />
          <Skeleton className="h-3 w-16 col-span-2" />
          <Skeleton className="h-3 w-16 col-span-2" />
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-b-0"
          >
            <Skeleton className="h-4 w-40 col-span-5" />
            <Skeleton className="h-4 w-24 col-span-3" />
            <Skeleton className="h-4 w-20 col-span-2" />
            <Skeleton className="h-6 w-24 col-span-2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
