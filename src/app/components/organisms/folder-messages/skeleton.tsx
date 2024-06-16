import { Skeleton as AtomSkeleton } from "@/app/components/atoms/skeleton";

export function Skeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(15)].map((i) => (
        <AtomSkeleton key={i} className="h-[6.5rem]" />
      ))}
    </div>
  );
}
