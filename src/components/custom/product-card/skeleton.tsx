import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonProductCard() {
  return (
    <div className="border flex flex-col border-muted rounded-md">
      <Skeleton className="h-60 relative" />
      <div className="border-t border-muted p-4 flex flex-col gap-4 flex-1">
        <Skeleton className="h-3" />
        <Skeleton className="h-3 max-w-[100px]" />
      </div>
    </div>
  );
}
