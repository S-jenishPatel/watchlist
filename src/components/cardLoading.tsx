"use client";
import { Skeleton } from "@/components/ui/skeleton";

function CardLoading({ isWatchlist = false }: { isWatchlist?: boolean }) {
  // No of Cards=6
  const cardDivClasslist = isWatchlist
    ? "grid grid-cols-4 gap-10 max-sm:gap-2"
    : "flex gap-10 max-sm:gap-2 overflow-x-scroll pb-4";

  return (
    <div>
      <Skeleton className="h-8 w-1/3 my-4" />
      <div className={cardDivClasslist}>
        {/* Card Starts here */}

        <div className="flex flex-col space-y-3">
          <Skeleton className="w-52 h-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="w-52 h-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="w-52 h-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="w-52 h-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="w-52 h-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="w-52 h-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Card Ends here */}
      </div>
    </div>
  );
}

export default CardLoading;
