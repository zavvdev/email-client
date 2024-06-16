import { Skeleton as AtomSkeleton } from "@/app/components/atoms/skeleton";

export function Skeleton() {
  return (
    <div className="flex flex-col justify-between h-full pb-3">
      <div className="flex flex-col gap-1">
        {[...Array(3)].map((i) => (
          <AtomSkeleton key={i} className="h-10" />
        ))}
      </div>
      <div className="flex flex-col justify-end pt-3">
        <div className="flex gap-2">
          {[...Array(3)].map((i) => (
            <AtomSkeleton key={i} className="h-[2.5rem] w-[2.5rem]" />
          ))}
        </div>
      </div>
    </div>
  );
}
